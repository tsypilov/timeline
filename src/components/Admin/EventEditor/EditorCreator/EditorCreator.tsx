import React from "react";
import {Dropdown, Input, MenuItem} from "retail-ui/components";
import * as styles from "./EditorCreator.less";

interface Props {
    editor: services.EventScope;
    onChangeField: (fieldName: string, value: any) => void;
}

class EditorCreator extends React.Component<Props, {}> {
    render() {
        const {editor, onChangeField} = this.props;
        const fields = editor.fields;
        const result = [];
        for (const key of Object.keys(fields)) {
            const field = fields[key] as services.Field;
            if (field.type === services.FieldTypes.TEXT) {
                result.push(
                    <div key={key}>
                        <span className={styles.title}>{field.name}</span>
                        <Input width={300} value={field.value} onChange={(_, v) => onChangeField(key, v)}/>
                    </div>);
            }
            if (field.type === services.FieldTypes.NUMBER) {
                result.push(
                    <div key={key}>
                        <span className={styles.title}>{field.name}</span>
                        <Input mask={"9999999999999999999"}
                               maskChar={null}
                               width={300}
                               value={field.value} onChange={(_, v) => onChangeField(key, v)}/>
                    </div>);
            }
            if (field.type === services.FieldTypes.TRANSACTION) {
                result.push(
                    <div key={key}>
                        <span className={styles.title}>{field.name}</span>
                        <Dropdown caption={this.captionTransaction(field.value)} width={150}>
                            <MenuItem
                                onClick={() => onChangeField(key, events.transactionType.arrival)}>Приход</MenuItem>
                            <MenuItem
                                onClick={() => onChangeField(key, events.transactionType.expense)}>Расход</MenuItem>
                        </Dropdown>
                    </div>);
            }
            if (field.type === services.FieldTypes.CURRENCY_TYPE) {
                result.push(
                    <div key={key}>
                        <span className={styles.title}>{field.name}</span>
                        <Dropdown caption={this.captionCurrency(field.value)} width={150}>
                            <MenuItem onClick={() => onChangeField(key, events.currencyType.ruble)}>
                                Рубль - ₽
                            </MenuItem>
                            <MenuItem onClick={() => onChangeField(key, events.currencyType.dollar)}>
                                Доллар - $
                            </MenuItem>
                            <MenuItem onClick={() => onChangeField(key, events.currencyType.euro)}>
                                Евро - €
                            </MenuItem>
                        </Dropdown>
                    </div>);
            }
        }
        return <div className={styles.root}>{result}</div>;
    }

    captionTransaction(transactionType: events.transactionType) {
        switch (transactionType) {
            case events.transactionType.arrival:
                return "Приход";
            case events.transactionType.expense:
                return "Расход";
            default:
                return "";
        }
    }

    captionCurrency(currencyType: events.currencyType) {
        switch (currencyType) {
            case events.currencyType.ruble:
                return "Рубль - ₽";
            case events.currencyType.dollar:
                return "Доллар - $";
            case events.currencyType.euro:
                return "Евро - €";
            default:
                return "";
        }
    }
}

export default EditorCreator;