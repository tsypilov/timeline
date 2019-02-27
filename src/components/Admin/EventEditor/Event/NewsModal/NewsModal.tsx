import React from "react";
import * as styles from "./NewsModal.less";
import {Modal} from "retail-ui/components";
import Toggle from "retail-ui/components/Toggle";
import classnames from "classnames";

const {Body, Header, Footer} = Modal;

interface Props {
    result: any;
    isRead: boolean;
    toggleRead: () => void;
    onClose: () => void;
}

class NewsModal extends React.Component<Props, {}> {
    render() {
        const {toggleRead, result, onClose, isRead} = this.props;

        return <Modal width={400}
                      onClose={onClose}>
            <Header>Новость</Header>
            <Body>
            {result}
            </Body>
            <Footer>
                <Toggle disabled={isRead} checked={isRead} onChange={toggleRead}/>{" "}
                <span className={classnames(styles.noneRead, {[styles.read]: isRead})}
                      onClick={this.handleClick}>Прочтено</span>
            </Footer>
        </Modal>;
    }

    handleClick = () => {
        const {isRead, toggleRead} = this.props;

        if (!isRead) {
            toggleRead();
        }
    }
}

export default NewsModal;