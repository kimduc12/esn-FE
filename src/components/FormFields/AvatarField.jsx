import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { makeStyles } from '@mui/styles';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import classNames from 'classnames';
import { toast } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexFlow: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    wrapper: {
        borderRadius: '50%',
        padding: theme.spacing(1),
        border: '1px dashed rgba(145, 158, 171, 0.32)',
        marginBottom: theme.spacing(2),
        position: 'relative',
        overflow: 'hidden',
        '&:hover > .overlay': {
            opacity: 0.72,
        },
    },
    overlay: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        color: 'rgb(255, 255, 255)',
        backgroundColor: 'rgb(22, 28, 36)',
        display: 'flex',
        flexFlow: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        left: 0,
        opacity: 0,
        cursor: 'pointer',
    },
}));

export function AvatarField({ name, src, onChange }) {
    const classes = useStyles();

    const [image, _setImage] = React.useState(src);
    const inputFileRef = React.useRef(null);

    const cleanup = () => {
        URL.revokeObjectURL(image);
        inputFileRef.current.value = null;
    };

    const setImage = (newImage) => {
        if (image) {
            cleanup();
        }
        _setImage(newImage);
    };

    const handleOnChange = (event) => {
        const newImage = event.target?.files?.[0];
        const file_size = event.target.files[0].size;
        const file_type = event.target.files[0].type;
        console.log('file_size', file_size);
        console.log('file_type', file_type);
        // Check file size bigger than 1MB
        if (Math.trunc(file_size / 1000) > 1000) {
            toast.error('Image size must be less than 1MB');
            return;
        }
        // Check file type in array image types
        if (!['image/jpeg', 'image/jpg', 'image/png', 'image/gif'].includes(file_type)) {
            toast.error('Image type must be *.jpeg, *.jpg, *.png, *.gif');
            return;
        }
        if (newImage) {
            // onChange(newImage);
            setImage(URL.createObjectURL(newImage));
        }
    };

    return (
        <Box className={classes.root}>
            <Box className={classes.wrapper}>
                <Avatar alt="" src={image} sx={{ width: 144, height: 144 }} />
                <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id={`input-upload-${name}`}
                    type="file"
                    ref={inputFileRef}
                    onChange={handleOnChange}
                />
                <Box
                    component="label"
                    htmlFor={`input-upload-${name}`}
                    className={classNames(classes.overlay, 'overlay')}
                >
                    <CameraAltIcon />
                    <Typography component="span" variant="caption">
                        Update photo
                    </Typography>
                </Box>
            </Box>
            <Typography component="span" variant="caption">
                Allowed *.jpeg, *.jpg, *.png, *.gif
                <br /> max size of 1 MB
            </Typography>
        </Box>
    );
}

AvatarField.propTypes = {
    name: PropTypes.string,
    src: PropTypes.string,
    onChange: PropTypes.func,
};
