import moment from "moment";
import React from "react";
import {Button, Dropdown, MenuItem} from "retail-ui/components";
import {newsEditor, transactionEditor} from "../../../typings/constants";
import EditorCreator from "./EditorCreator/EditorCreator";
import Event from "./Event/Event";
import * as styles from "./EventEditor.less";

interface Props {
    onSave: (newEvent: any) => void;
    allEvents: services.EventScope[];
    onRemove: (id: number) => void;
}

interface State {
    editor?: services.EventScope;
    eventType: events.eventType;
    sort: services.Sort;
}

class EventEditor extends React.Component<Props, State> {
    state = {
        eventType: events.eventType.none,
        editor: null,
        sort: services.Sort.dateDESC,
    };

    render() {
        const {editor} = this.state;
        const {allEvents, onRemove} = this.props;
        const isDisabled = this.isEmptyField();
        const sortedEvents = this.sortEvents(allEvents);

        return (
            <div className={styles.root}>
                <div className={styles.eventDropdowns}>
                    <div>
                        <div className={styles.title}>Добавить новое событие</div>
                        <Dropdown caption={this.eventCaption()} width={250}>
                            <MenuItem onClick={() => this.editorSelector(events.eventType.news)}>
                                Новость
                            </MenuItem>
                            <MenuItem onClick={() => this.editorSelector(events.eventType.transaction)}>
                                Транзакция
                            </MenuItem>
                        </Dropdown>
                    </div>

                    <div>
                        <div className={styles.title}>Тип сортировки</div>
                        <Dropdown caption={this.sortCaption()} width={200}>
                            <MenuItem onClick={() => this.setState({sort: services.Sort.dateDESC})}>
                                Дата по убыванию
                            </MenuItem>
                            <MenuItem onClick={() => this.setState({sort: services.Sort.dateASC})}>
                                Дата по возрастанию
                            </MenuItem>
                            <MenuItem onClick={() => this.setState({sort: services.Sort.eventType})}>
                                Тип события
                            </MenuItem>
                        </Dropdown>
                    </div>
                </div>

                {editor && <EditorCreator editor={editor} onChangeField={this.handleChangeField} />}

                <div className={styles.saveButton}>
                    {editor && <Button width={150}
                                       disabled={isDisabled}
                                       onClick={() => this.handleSave(editor)}>Сохранить</Button>}
                </div>

                {sortedEvents && sortedEvents.map((event) =>
                    <Event remove={() => onRemove(event.fields.id.value)}
                           key={event.fields.id.value}
                           event={event} />)}
            </div>
        );
    }

    sortEvents = (allEvents: services.EventScope[]) => {
        const {sort} = this.state;
        let events = [...allEvents];

        if (sort === services.Sort.dateDESC) {
            events.sort((a, b) => b.fields.id.value - a.fields.id.value);
            return events;
        }

        if (sort === services.Sort.dateASC) {
            events.sort((a, b) => a.fields.id.value - b.fields.id.value);
            return events;
        }

        if (sort === services.Sort.eventType) {
            events.sort((a, b) => a.fields.eventType.value - b.fields.eventType.value);
            return events;
        }
    }

    eventCaption = () => {
        switch (this.state.eventType) {
            case events.eventType.news:
                return "Новость";
            case events.eventType.transaction:
                return "Транзакция";
            default:
                return "Выбрать событие";
        }
    }

    sortCaption = () => {
        switch (this.state.sort) {
            case services.Sort.eventType:
                return "Тип события";
            case services.Sort.dateASC:
                return "Дата по возрастанию";
            default:
                return "Дата по убыванию";
        }
    }

    isEmptyField = () => {
        if (!this.state.editor) {
            return true;
        }

        const {fields} = this.state.editor;
        for (const key of Object.keys(fields)) {
            const field = fields[key] as services.Field;
            if (field.type !== services.FieldTypes.DATE &&
                field.type !== services.FieldTypes.ID) {
                if (!field.value) {
                    return true;
                }
            }
        }
        return false;
    }

    handleSave = (editor) => {
        const fieldId = "id";
        const fieldDate = "date";
        const date = moment(new Date()).local(true).format("DD.MM.YYYY HH:mm:ss");
        editor.fields[fieldId].value = Date.now();
        editor.fields[fieldDate].value = date;
        this.setState({editor}, () => {
            this.props.onSave(editor);
            this.setState({editor: null, eventType: events.eventType.none});
        });
    }

    handleChangeField = (fieldName: string, value: any) => {
        let editor: services.EventScope = this.state.editor;
        editor.fields[fieldName].value = value;
        this.setState({editor});
    }

    editorSelector = (eventType: events.eventType) => {
        let editor = null;
        switch (eventType) {
            case events.eventType.news:
                editor = newsEditor;
                break;
            case events.eventType.transaction:
                editor = transactionEditor;
                break;
            default:
                editor = null;
        }
        this.setState({editor: JSON.parse(JSON.stringify(editor)), eventType});
    }
}

export default EventEditor;