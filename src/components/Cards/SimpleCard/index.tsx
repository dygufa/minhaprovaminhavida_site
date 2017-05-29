import * as React from "react";
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import {Button, IconButton} from "react-toolbox/lib/button";

const s = require("./SimpleCard.scss");

interface Props {
    name?: string;
    professor?: string;
    course?: string;
    thumbnail?: string;
};

const dummyText = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.';

class SimpleCard extends React.Component<Props, {}> {
    render() {
        return (
              <Card style={{width: '350px'}}>
                    <CardTitle
                    avatar="https://placeimg.com/80/80/animals"
                    title="Avatar style title"
                    subtitle="Subtitle here"
                    />
                    <CardMedia
                    aspectRatio="wide"
                    image="https://placeimg.com/800/450/nature"
                    />
                    <CardTitle
                    title="Title goes here"
                    subtitle="Subtitle here"
                    />
                    <CardText>{dummyText}</CardText>
                    <CardActions>
                    <Button label="Action 1" />
                    <Button label="Action 2" />
                    </CardActions>
                </Card>
        );
    }

    render2() {
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
