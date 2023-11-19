import { Paper, Stack, styled } from "@mui/material";

export const Content = () => {
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));

    return (
        <Stack direction="column"
                alignItems="stretch"
                justifyContent="flex-end"
                spacing={5}>
            <Item>Item 1</Item>
            <Item>Item 2</Item>
            <Item>Long content</Item>
            <Item>Item 1</Item>
            <Item>Item 2</Item>
            <Item>Long content</Item>
            <Item>Item 1</Item>
            <Item>Item 2</Item>
            <Item>Long content</Item>
            <Item>Item 1</Item>
            <Item>Item 2</Item>
            <Item>Long content</Item>
            <Item>Item 1</Item>
            <Item>Item 2</Item>
            <Item>Long content</Item>
            <Item>Item 1</Item>
            <Item>Item 2</Item>
            <Item>Long content</Item>
            <Item>Item 1</Item>
            <Item>Item 2</Item>
            <Item>Long content</Item>
            <Item>Item 1</Item>
            <Item>Item 2</Item>
            <Item>Long content</Item>
            <Item>Item 1</Item>
            <Item>Item 2</Item>
            <Item>Long content</Item>
        </Stack>
    );
}