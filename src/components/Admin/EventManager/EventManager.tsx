import React from "react";
import EventEditor from "../EventEditor";
import * as styles from "./EventManager.less";

interface State {
    events: services.EventScope[];
}

class EventManager extends React.Component<{}, State> {
    constructor(state: State) {
        super(state);
        this.state = {
            events: [],
        };
    }

    render() {
        return (
            <div className={styles.root}>
                <EventEditor onRemove={this.onRemoveEvent} allEvents={this.state.events} onSave={this.onSaveEvent}/>
            </div>
        );
    }

    onSaveEvent = (event: any) => {
        let events = [...this.state.events];
        events.push(event);
        this.setState({events});
    }

    onRemoveEvent = (id: number) => {
        let events = [...this.state.events];
        events = events.filter((event, idx) => idx !== id);
        this.setState({events});
    }
}

export default EventManager;