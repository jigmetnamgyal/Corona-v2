import React from 'react'
import {Card, CardContent, Typography} from "@material-ui/core";
function InfoCard({title, cases, total}) {
    return (
        <Card className="info">
            <CardContent>
                <Typography className="info_title" color="textSecondary">{title}</Typography>
                <h3 className="info_cases">{cases}</h3>
                <Typography className="info_total" color="textSecondary">{total}</Typography>
            </CardContent>
        </Card>
    )
}

export default InfoCard
