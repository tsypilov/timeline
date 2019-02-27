import React from "react";
import RouteNames from "../../app/Routes/RouteNames";
import * as styles from "./Header.less";

class Header extends React.Component<{}, {}> {

    render() {
        return (
            <div className={styles.root}>
                <div className={styles.content}>
                    <div className={styles.title}>
                        <a href={RouteNames.root}>Таймлайн</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;