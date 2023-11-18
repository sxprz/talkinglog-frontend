import { FileUpload, UploadFile } from "@mui/icons-material";
import { Stack, Button, Divider, Typography } from "@mui/material";

export const Content = () => {

    return (
        <Button component="label" variant="outlined" sx={{ width: 400, height: 400 }} style={{ textTransform: 'none' }} >
            <input hidden accept="*" type="file" />
            <Stack
                direction="column"
                divider={<Divider orientation="horizontal" flexItem />}
                spacing={2}
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <FileUpload sx={{ fontSize: '100px' }} />
                <Typography sx={{ overflowWrap: 'break-word', maxWidth: '200px' }}>
                    Upload file to start talking with your log files 
                </Typography>
            </Stack>
        </Button>
    );
}