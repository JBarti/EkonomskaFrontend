import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import FileDownload from '@material-ui/icons/FileDownload'
import Typography from '@material-ui/core/Typography'


const styles = theme => ({
    listItemText: {
        letterSpacing: 0.82,
    },
    sidebarItem: {
        position: 'relative',
        width: '100%',
    },
    sidebarItemTabbed: {
        paddingLeft: 40,
    }
})

class ListButton extends Component {

    render() {
        const { classes } = this.props;
        return (
            <ListItem
                button
                className={this.props.tabbed ? classes.sidebarItemTabbed : classes.sidebarItem}
                onClick={this.props.onClick}>
                <ListItemIcon>
                    {!this.props.icon ? <FileDownload /> : this.props.icon}
                </ListItemIcon>
                <ListItemText
                    inset
                    primary={this.props.primary}
                    secondary={this.props.secondary}
                    className={classes.listItemText} />
            </ListItem >
        );
    }
}

ListButton.propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    icon: PropTypes.object,
    primary: PropTypes.string.isRequired,
    secondary: PropTypes.string,
    tabbed: PropTypes.bool,
    onClick: PropTypes.func,
};

export default withStyles(styles)(ListButton);