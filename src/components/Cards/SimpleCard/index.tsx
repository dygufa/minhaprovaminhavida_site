import * as React from "react";
const s = require("./SimpleCard.scss");

interface Props {
    name?: string;
    professor?: string;
    course?: string;
    thumbnail?: string;
};

class SimpleCard extends React.Component<Props, {}> {
    render() {
        return (
            <div className={s.cardWrapper}>
                <div className={s.card}>
                    <header className={s.header}>
    					<i className="fa fa-lg fa-file-text-o" aria-hidden="true"></i>
    					<h2 className={s.title}>
    						{this.props.name}
    					</h2>
    				</header>
    				<div className={s.content}>
                        <div className={s.avatar}>
    					    <img className={s.thumbnail} src={this.props.thumbnail}/>
                        </div>
                        <div className={s.description}>
    					    Professor: {this.props.professor}
                            <br/>
                            Discplina: {this.props.course}
                        </div>
    				</div>
                    <footer className={s.footer}>
                        <a className={s.footerItem + " " + s.like}>
                            <span className={s.icon}>
                            <i className="fa fa-heart"></i>
                            </span> Gostei
                        </a>
                        <a className={s.footerItem + " " + s.down}>
                            <span className={s.icon}>
                                <i className="fa fa-arrow-circle-o-down"></i>
                            </span>
                            Baixar
                        </a>
                    </footer>
                </div>
            </div>
        );
    }
}

export default SimpleCard;
