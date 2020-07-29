import React from 'react'
import {Card, CardContent, Typography} from "@material-ui/core";
import './infocard.css';
function InfoCard({title,isRed, cases,active,icon, total, ...props}) {
    return (
        <Card className={`info ${active && 'info--selected'} ${isRed && 'info--red'}`} onClick={props.onClick}>
            <CardContent>
                <Typography className="info_title" color="textSecondary">{icon} {title}</Typography>
                <h3 className={`info_cases ${!isRed && 'info--textColor'}` }>{cases}</h3>
                <Typography className="info_total" color="textSecondary">{total}</Typography>
            </CardContent>
        </Card>
    )
}

export default InfoCard
