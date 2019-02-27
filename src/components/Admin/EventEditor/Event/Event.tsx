import React from "react";
import * as styles from "./Event.less";
import TrashIcon from "@skbkontur/react-icons/Trash";
import NewsModal from "./NewsModal/NewsModal";
import classnames from "classnames";

interface Props {
    event: services.EventScope;
    remove: () => void;
}

interface State {
    showNewsModal: boolean;
    isRead: boolean;
}

class Event extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            showNewsModal: false,
            isRead: false,
        };
    }

    render() {
        const {eventType, result} = this.event();
        const {remove} = this.props;
        const className = eventType === "Новость" ?
            classnames(styles.rootNews, {[styles.read]: this.state.isRead}) :
            styles.root;

        return <div>
            <div className={className}
                    onClick={() => this.toggleShowNewsModal(eventType)}>
            <span className={styles.eventType}>
                <span>{eventType}</span>
                {eventType === "Транзакция" &&
                <div className={styles.trash} onClick={remove}><TrashIcon/></div>}
            </span>
            {result}
        </div>
            {this.renderNewsModal(result)}
        </div>;
    }

    toggleShowNewsModal = (eventType: string) => {
        if (eventType === "Новость") {
            this.setState({showNewsModal: true});
        }
    }

    renderNewsModal = (result: any) => {
        const {showNewsModal, isRead} = this.state;

        return showNewsModal && <NewsModal result={result}
                                           toggleRead={() => this.setState({isRead: !isRead})}
                                           isRead={isRead}
                                           onClose={() => this.setState({showNewsModal: false})}/>;
    }

    event = () => {
        const {event} = this.props;
        const fields = event.fields;
        let result = [];
        let eventType = "";

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
        }

        return {result, eventType};
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