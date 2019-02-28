import React from "react";
import * as styles from "./Event.less";
import TrashIcon from "@skbkontur/react-icons/Trash";
import EventModal from "./EventModal/EventModal";
import classnames from "classnames";

interface Props {
    event: services.EventScope;
    remove: () => void;
}

interface State {
    showEventModal: boolean;
    isRead: boolean;
}

class Event extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            showEventModal: false,
            isRead: false,
        };
    }

    render() {
        const {eventType, fullResult, partialResult} = this.event();
        const {remove} = this.props;
        const className = eventType === "Новость" ?
            classnames(styles.root, {[styles.read]: this.state.isRead}) :
            styles.root;

        return <div>
            <div className={className} onClick={this.toggleShowModal}>
            <span className={styles.eventType}>
                <span>{eventType}</span>
                <div className={styles.trash} onClick={remove}><TrashIcon/></div>
            </span>
            {eventType === "Новость" ? partialResult : fullResult}
        </div>
            {this.renderEventModal(fullResult, eventType)}
        </div>;
    }

    toggleShowModal = () => {
            this.setState({showEventModal: true});
    }

    renderEventModal = (result: any, eventType: string) => {
        const {showEventModal, isRead} = this.state;

        return showEventModal && <EventModal result={result}
                                             eventType={eventType}
                                             toggleRead={() => this.setState({isRead: !isRead})}
                                             isRead={isRead}
                                             onClose={() => this.setState({showEventModal: false})}
                                             onRemove={this.props.remove}/>;
    }

    event = () => {
        const {event} = this.props;
        const fields = event.fields;
        let fullResult = [];
        let title = [];
        let eventType = "";

        for (const key of Object.keys(fields)) {
            const field = fields[key] as services.Field;
            if (key === "eventType") {
                eventType = field.title;
            }

            if (event.fields.eventType.value === events.eventType.news && key === "title") {
                title.push(
                    <div key={key}>
                        <span className={styles.title}>{field.value}</span>
                    </div>);
            }

            if (field.type === services.FieldTypes.TEXT ||
                field.type === services.FieldTypes.NUMBER ||
                key === "date") {
                fullResult.push(
                    <div key={key} className={styles.item}>
                        <span className={styles.title}>{field.name}</span>
                        <span className={styles.value}>{field.value}</span>
                    </div>);
            }
            if (field.type === services.FieldTypes.TRANSACTION) {
                fullResult.push(
                    <div key={key} className={styles.item}>
                        <span className={styles.title}>{field.name}</span>
                        {field.value === events.transactionType.arrival ?
                            <span className={styles.arrival}>Приход</span> :
                            <span className={styles.expense}>Расход</span>}
                    </div>);
            }
            if (field.type === services.FieldTypes.CURRENCY_TYPE) {
                fullResult.push(
                    <div key={key}>
                        <span className={styles.title}>{field.name}</span>
                        <span className={styles.value}>{this.currencyValue(field.value)}</span>
                    </div>);
            }
        }

        return {fullResult, partialResult: title, eventType};
    }

    currencyValue = (value: events.currencyType) => {
        switch (value) {
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

export default Event;