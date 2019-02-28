import React from "react";
import * as styles from "./EventModal.less";
import {Button, Modal} from "retail-ui/components";
import Toggle from "retail-ui/components/Toggle";
import TrashIcon from "@skbkontur/react-icons/Trash";

const {Body, Header, Footer} = Modal;

interface Props {
    result: any;
    isRead: boolean;
    toggleRead: () => void;
    onClose: () => void;
    eventType: string;
    onRemove: () => void;
}

class EventModal extends React.Component<Props, {}> {
    render() {
        const {toggleRead, result, onClose, isRead, eventType, onRemove} = this.props;

        return <Modal width={400}
                      onClose={onClose}>
            <Header>Новость</Header>
            <Body>
                {result}
            </Body>
            <Footer>
                <div className={styles.footer}>
                    {eventType === "Новость" && <div className={styles.newsOptions}>
                        <div className={styles.toggle}>
                            <Toggle checked={isRead} onChange={toggleRead}/>{" "}
                            <span className={styles.toggleHint}
                                  onClick={toggleRead}>{isRead ? "Ознакомлен" : "Не ознакомлен"}</span>
                        </div>

                        <Button width={150} onClick={toggleRead}>{!isRead ? "Ознакомлен" : "Не ознакомлен"}</Button>
                    </div>}
                    <div className={styles.trash} onClick={onRemove}><TrashIcon/></div>
                </div>
            </Footer>
        </Modal>;
    }
}

export default EventModal;