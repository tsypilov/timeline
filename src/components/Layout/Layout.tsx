import React from "react";
import "../../common/Global.less";
import {Sticky} from "retail-ui/components";
import * as styles from "./Layout.less";
import Header from "../Header";
import routes from "../../app/Routes/Routes";

class Layout extends React.Component<{}, {}> {

    render() {
        return (
            <div className={styles.root}>
                <Sticky side={"top"}>
                    <Header/>
                </Sticky>
                <div className={styles.content}>{routes()}</div>
            </div>
        );
    }
}

export default Layout;