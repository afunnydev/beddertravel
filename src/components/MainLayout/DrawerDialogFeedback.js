import React from 'react';

import DrawerDialogPropainer from './DrawerDialogPropainer';
import DrawerDialogSaga from './DrawerDialogSaga';

import SupportTicket from 'components/SupportTicket';

class DrawerDialogFeedback extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };

  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false, settings: Object.assign({}, this.state.actualSettings) });
  };

  render() {
    const { fullScreen, classes } = this.props;
    const MenuItemBtn = this.props.btn;
    return (
      <DrawerDialogPropainer>
        <DrawerDialogSaga />
        <MenuItemBtn onClick={this.handleClickOpen}>{this.props.btntext}</MenuItemBtn>
        <SupportTicket
          isQuestion={false}
          closeFn={this.handleClose}
          isOpen={this.state.open}
          backdropClick={true}
          ticketType={2}
          // businessId={this.props.modelId}
        />
      </DrawerDialogPropainer>
    );
  }
}

// export default withMobileDialog()(DrawerDialog);
export default DrawerDialogFeedback;
