import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import LoadingButton from '@mui/lab/LoadingButton';
import Tooltip from '@mui/material/Tooltip';

// ** icons
import DeleteIcon from '@mui/icons-material/Delete';
import CachedIcon from '@mui/icons-material/Cached';
import GetAppIcon from '@mui/icons-material/GetApp';
import CreateIcon from '@mui/icons-material/Create';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';


export const DeleteButton = (props) => {
    const {loading, disabled, callback = () => {}} = props

    return (
        <IconButton
            size="small"
            className="whitespace-nowrap mx-5"
            disabled={disabled || loading }
            onClick={callback}
        >
            {loading ?  <CircularProgress size={16} /> :  <DeleteIcon fontSize="small" /> }
        
        </IconButton>
    )
}

export const RemoveButton = (props) => {
    const {loading, disabled, callback = () => {}, color = "error"} = props

    return (
        <IconButton
            size="small"
            className="whitespace-nowrap mx-5"
            disabled={disabled}
            onClick={callback}
            color={color}
        >
            {loading ?  <CircularProgress size={16} /> :  <RemoveCircleIcon fontSize="small" /> }
        
        </IconButton>
    )
}

export const EditButton = (props) => {
    const {loading, disabled, callback = () => {}, className = 'mx-5', tooltip} = props

    return (
        <Tooltip title={tooltip}>
        <IconButton
            size="small"
            className={`whitespace-nowrap ${className}`}
            disabled={disabled}
            onClick={callback}
        >
            {loading ?  <CircularProgress size={16} /> :  <CreateIcon fontSize="small" /> }
        
        </IconButton>
        </Tooltip>
    )
}

export const CloseButton = (props) => {
    const {loading, disabled, callback = () => {}, className = 'mx-5'} = props

    return (
        <IconButton
            size="small"
            className={`whitespace-nowrap ${className}`}
            disabled={disabled}
            onClick={callback}
        >
            {loading ?  <CircularProgress size={16} /> :  <CloseIcon fontSize="small" /> }
        
        </IconButton>
    )
}

export const ResendButton = (props) => {
    const {loading, disabled, callback = () => {}, color = "secondary", tooltip} = props

    return (
        <Tooltip title={tooltip}>
        <IconButton
            size="small"
            className="whitespace-nowrap mx-5"
            disabled={disabled}
            onClick={callback}
            color={color}
        >
            {loading ?  <CircularProgress size={16} /> :  <CachedIcon fontSize="small" /> }
        
        </IconButton>
        </Tooltip>
    )
}

export const DownloadButton = (props) => {
    const {loading, disabled, callback = () => {}, tooltip} = props

    return (
        <Tooltip title={tooltip}>
        <IconButton
            size="small"
            className="whitespace-nowrap mx-5"
            disabled={disabled || loading}
            onClick={callback}
            // color="secondary"
        >
            {loading ?  <CircularProgress size={16} /> :  <GetAppIcon fontSize="small" /> }
        
        </IconButton>
        </Tooltip>
    )
}


export const AddButton = (props) => {
    const {loading, disabled, callback = () => {},label = 'Add', color = 'primary', variant = "contained", icon = false, className = 'mx-5'} = props

    return (
        <Button
            size="small"
            className={`whitespace-nowrap ${className}`}
            disabled={disabled}
            onClick={callback}
            variant={variant}
            color={color}
            startIcon={ icon ? <AddIcon  /> : null}
        >
            {label}
        </Button>
    )
}


export const AddButtonSmall = (props) => {
    const {loading, disabled, callback = () => {}} = props

    return (
        <IconButton
            size="small"
            className="whitespace-nowrap mx-5"
            disabled={disabled}
            onClick={callback}
        >
            {loading ?  <CircularProgress size={16} /> :  <AddIcon fontSize="small" /> }
        
        </IconButton>
    )
}



export const InstallButton = (props) => {
    const {loading, disabled, callback = () => {}, label = 'Install', color = 'success'} = props

    return (
        <LoadingButton
            size="small"
            className="whitespace-nowrap mx-5"
            disabled={disabled}
            onClick={callback}
            loading={loading}
            loadingPosition="start"
            variant="outlined"
            color={color}
            startIcon={ <AddIcon  /> }
        >
            {label}
        </LoadingButton>
    )
}

export const UninstallButton = (props) => {
    const {loading, disabled, callback = () => {}, label = 'Uninstall', color = 'error'} = props

    return (
        <LoadingButton
            size="small"
            className="whitespace-nowrap mx-5"
            disabled={disabled}
            onClick={callback}
            loading={loading}
            loadingPosition="start"
            variant="outlined"
            color={color}
            startIcon={ <RemoveIcon  /> }
        >
            {label}
        </LoadingButton>
    )
}

export const SaveButton = (props) => {
    const {loading, disabled, callback = () => {}, label = 'Save', color = 'primary', className = 'mx-5'} = props

    return (
        <LoadingButton
            size="small"
            className={`whitespace-nowrap ${className}`}
            disabled={disabled}
            onClick={callback}
            loading={loading}
            loadingPosition="start"
            variant="contained"
            color={color}
            startIcon={ <CheckIcon  /> }
        >
            {label}
        </LoadingButton>
    )
}

