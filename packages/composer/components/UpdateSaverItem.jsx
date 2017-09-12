import React from 'react';
import AppActionCreators from '../action-creators/AppActionCreators';
import { QueueingTypes, SaveButtonTypes } from '../AppConstants';
import Dropdown, { DropdownTrigger, DropdownContent } from '../components/Dropdown';
import DateTimeSlotPicker from '../components/DateTimeSlotPicker';
import Button from '../components/Button';

import styles from './css/UpdateSaver.css';

const buttonsQueuingTypesMap = new Map([
  [SaveButtonTypes.ADD_TO_QUEUE, QueueingTypes.QUEUE],
  [SaveButtonTypes.SHARE_NEXT, QueueingTypes.NEXT],
  [SaveButtonTypes.SHARE_NOW, QueueingTypes.NOW],
  [SaveButtonTypes.SCHEDULE_POST, QueueingTypes.CUSTOM],
  [SaveButtonTypes.SAVE, QueueingTypes.SAVE],
  [SaveButtonTypes.SAVE_AND_APPROVE, QueueingTypes.SAVE_AND_APPROVE],
  [SaveButtonTypes.ADD_TO_DRAFTS, QueueingTypes.ADD_DRAFT],
  [SaveButtonTypes.SHARE_NEXT_DRAFT, QueueingTypes.NEXT_DRAFT],
  [SaveButtonTypes.SCHEDULE_DRAFT, QueueingTypes.CUSTOM_DRAFT],
]);

class UpdateSaverItem extends React.Component {
  static propTypes = {
    type: React.PropTypes.oneOf(Object.keys(SaveButtonTypes)).isRequired,
    children: React.PropTypes.node.isRequired,
    appState: React.PropTypes.object.isRequired,
    userData: React.PropTypes.object.isRequired,
    isInlineSchedulerDisplayed: React.PropTypes.bool.isRequired,
    disabled: React.PropTypes.bool,
    timezone: React.PropTypes.string,
    isMenuItem: React.PropTypes.bool,
    isSecondaryItem: React.PropTypes.bool,
    weekStartsMonday: React.PropTypes.bool.isRequired,
  };

  static defaultProps = {
    disabled: false,
    isMenuItem: false,
    isSecondaryItem: false,
  };

  onButtonClick = () => {
    const { type } = this.props;
    const queuingType = buttonsQueuingTypesMap.get(type);

    AppActionCreators.saveDrafts(queuingType, { shouldSkipEmptyTextAlert: false });
  };

  /**
   * DateTimeSlotPicker is displayed within a DropDown component, which takes care
   * of showing/hiding it when necessary. To do that, the DropDown component
   * listens to clicks in the whole document, and when a click happens on a
   * DOM element outside of DropdownContent, it is hidden. That's awesome, but
   * in some situations with DateTimeSlotPicker, users will click on buttons, and
   * the UI will change in such a way that the buttons that were clicked will
   * disappear: when that's the case, the DropDown component will wrongly deduct
   * that the click happened outside of the DropDown, and will proceed to hiding
   * the DateTimeSlotPicker. E.g. http://cl.ly/1R071e0i191e
   * To prevent this, we stop click event bubbling at the DateTimeSlotPicker level :)
   */
  onDateTimeSlotPickerClick = (e) => e.stopPropagation();

  onDateTimeSlotPickerSubmit = (timestamp) => {
    const { type } = this.props;
    const queuingType = buttonsQueuingTypesMap.get(type);

    AppActionCreators.saveDrafts(queuingType, {
      customScheduleTime: timestamp,
      shouldSkipEmptyTextAlert: false,
    });
  };

  onMouseEnter = () => {
    if (!this.props.appState.isSavingPossible) {
      AppActionCreators.trackUserAction(['composer', 'hovered_over_disabled_add_to_queue']);
    }
  };

  onMouseDown = () => {
    if (!this.props.appState.isSavingPossible) {
      AppActionCreators.trackUserAction(['composer', 'clicked_on_disabled_add_to_queue']);
    }
  };

  render() {
    const {
      type, children, userData, disabled, timezone, isMenuItem,
      isSecondaryItem, weekStartsMonday, isInlineSchedulerDisplayed,
    } = this.props;

    const buttonClassName =
      isMenuItem ? styles.dropdownMenuItem :
      isSecondaryItem ? styles.secondaryButton :
      styles.button;

    const schedulishSaveButtonTypes = [
      SaveButtonTypes.SCHEDULE_POST,
      SaveButtonTypes.SCHEDULE_DRAFT,
    ];

    const internalButtonType =
      (schedulishSaveButtonTypes.includes(type) && !isInlineSchedulerDisplayed) ?
      'SCHEDULE_POST_DROPDOWN' : 'BUTTON';

    switch (internalButtonType) {
      case 'SCHEDULE_POST_DROPDOWN':
        return (
          <Dropdown className={styles.dropdownContainerAsMenuItem}>
            <DropdownTrigger className={styles.dropdownTriggerAsMenuItem}>
              {children}
            </DropdownTrigger>
            <DropdownContent className={styles.dropdownContentAsMenuItem}>
              <DateTimeSlotPicker
                onClick={this.onDateTimeSlotPickerClick}
                onSubmit={this.onDateTimeSlotPickerSubmit}
                shouldUse24hTime={userData.uses24hTime}
                timezone={timezone}
                weekStartsMonday={weekStartsMonday}
              />
            </DropdownContent>
          </Dropdown>
        );

      default:
        return (
          <Button
            type="button"
            className={buttonClassName}
            disabled={disabled}
            onClick={this.onButtonClick}
            onMouseEnter={this.onMouseEnter}
            onMouseDown={this.onMouseDown}
          >
            {children}
          </Button>
        );
    }
  }
}

export default UpdateSaverItem;
