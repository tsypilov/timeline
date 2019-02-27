import TrashIcon from "@skbkontur/react-icons/Trash";
import React from "react";
import * as styles from "./Event.less";

interface Props {
    event: services.EventScope;
    remove: () => void;
}

class Event extends React.Component<Props, {}> {
    render() {
        const {event} = this.props;
        const fields = event.fields;
        let result = [];
        let eventType = "";
        let id = null;
        for (const key of Object.keys(fields)) {
            const field = fields[key] as services.Field;
            if (field.type === services.FieldTypes.TEXT ||
                field.type === services.FieldTypes.NUMBER ||
                key === "date") {
                result.push(
                    <div key={key}>
                        <span className={styles.title}>{field.name}</span>
                        <span className={styles.value}>{field.value}</span>
                    </div>);
            }
            if (key === "eventType") {
                eventType = field.title;
            }
            if (field.type === services.FieldTypes.TRANSACTION) {
                result.push(
                    <div key={key}>
                        <span className={styles.title}>{field.name}</span>
                        {field.value === events.transactionType.arrival ?
                            <span className={styles.arrival}>Приход</span> :
                            <span className={styles.expense}>Расход</span>}
                    </div>);
            }
            if (field.type === services.FieldTypes.CURRENCY_TYPE) {
                result.push(
                    <div key={key}>
                        <span className={styles.title}>{field.name}</span>
                        <span className={styles.value}>{this.currencyValue(field.value)}</span>
                    </div>);
            }
            if (field.type === services.FieldTypes.ID) {
                id = field.value;
            }
        }

        return <div className={styles.root}>
            <span className={styles.eventType}>
                <span>{eventType}</span>
                {eventType === "Транзакция" &&
                <div className={styles.trash} onClick={this.props.remove}><TrashIcon/></div>}
            </span>
            {result}
        </div>;
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