'use client'

import React from 'react';
import {useGetProductByIdQuery} from "~/redux/services/productApi";
import {ScrollArea, ScrollBar} from "~/components/ui/scroll-area";
import {Avatar, createStyles, Group, Paper, rem, Text, TypographyStylesProvider} from "@mantine/core";

const useStyles = createStyles((theme) => ({
    comment: {
        width: `25%`,
        padding: `${theme.spacing.lg} ${theme.spacing.xl}`,
    },

    body: {
        paddingLeft: rem(54),
        paddingTop: theme.spacing.sm,
        fontSize: theme.fontSizes.sm,
    },

    content: {
        '& > p:last-child': {
            marginBottom: 0,
        },
    },
}));

const ProductComment = ({id}: { id: number }) => {
    const {data} = useGetProductByIdQuery({id});
    const {classes} = useStyles();
    return (
        <div className="grid grid-cols-4 gap-6 mt-14">
            {data && data?.reviews.map((review, index) => {
                return (
                    <Paper w={"100%"} key={index} withBorder radius="md" className={classes.comment}>
                        <Group>
                            <Avatar
                                src={"https://www.clipartmax.com/png/middle/364-3643767_about-brent-kovacs-user-profile-placeholder.png"}
                                alt={review.customerName} radius="xl"/>
                            <div>
                                <Text fz="sm">{review.customerName}</Text>
                                <Text fz="xs" c="dimmed">
                                    {review.comment}
                                </Text>
                            </div>
                        </Group>
                        <TypographyStylesProvider className={classes.body}>
                            <div className={classes.content}/>
                        </TypographyStylesProvider>
                    </Paper>
                )
            })}
        </div>
    );
};

export default ProductComment;
