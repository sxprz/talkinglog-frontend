/*import { Alert } from "@mui/material";
import { Status, areFilesUploadedSignal, historyProcessingSignal, promptProcessingSignal } from "../App";


export const ToastManager = () => {
    const filesUp = areFilesUploadedSignal.value;
    const historyProc = historyProcessingSignal.value;
    const promptProc = promptProcessingSignal.value;

    return (
        <div style={{ width: "100%", height: "100%" }}>
            { filesUp.status === Status.FAILURE ?
                <Alert severity="error">{filesUp.additionalInfo}</Alert> :
                null
            }
            { historyProc.status === Status.FAILURE ?
                <Alert severity="error">{historyProc.additionalInfo}</Alert> :
                null
            }
            { promptProc.status === Status.FAILURE ?
                <Alert severity="error">{promptProc.additionalInfo}</Alert> :
                null
            }
            { filesUp.status === Status.SUCCESS ?
                <Alert severity="success">{filesUp.additionalInfo}</Alert> :
                null
            }
        </div>
    );
}*/