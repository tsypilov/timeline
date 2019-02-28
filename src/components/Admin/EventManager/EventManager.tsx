import React from "react";
import EventEditor from "../EventEditor";
import * as styles from "./EventManager.less";

interface State {
    events: services.EventScope[];
}

class EventManager extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            events: [],
        };
    }

    render() {
        return (
            <div className={styles.root}>
                <EventEditor onRemove={this.handleRemoveEvent}
                             allEvents={this.state.events}
                             onSave={this.handleSaveEvent}/>
            </div>
        );
    }

    handleSaveEvent = (event: any) => {
        let events = [...this.state.events];
        events.push(event);
        this.setState({events});
    }

    handleRemoveEvent = (id: number) => {
        let events = this.state.events;
        events = events.filter((event) => event.fields.id.value !== id);
        this.setState({events});
    }
}

export default EventManager;