/**
 * Simple slot picker. Works with 12/24h formats.
 *
 * This component is controlled through the slot prop, and uses the onChange
 * callback in props to let its parent know of any change.
 */

import React from 'react';
import moment from 'moment';
import Select from '../components/Select';

class SlotPicker extends React.Component {
  static propTypes = {
    metaData: React.PropTypes.object,
    shouldUse24hTime: React.PropTypes.bool.isRequired,
    onChange: React.PropTypes.func.isRequired,
    slots: React.PropTypes.arrayOf(React.PropTypes.shape({
      isSlotFree: React.PropTypes.bool.isRequired,
      timestamp: React.PropTypes.number.isRequired,
    })).isRequired,
    metaData: React.PropTypes.object,
    slot: React.PropTypes.instanceOf(moment),
    timezone: React.PropTypes.string,
    className: React.PropTypes.string,
  };

  static defaultProps = {
    metaData: undefined,
  };

  onSlotChange = (e) => {
    const { timezone } = this.props;

    const slotTimestamp = e.target.value;
    let slotMoment = moment.unix(slotTimestamp);
    if (timezone) slotMoment = slotMoment.tz(timezone);

    this.props.onChange(slotMoment);
  };

  getHumanReadableTimeSlotLabel = (timestamp, isSlotFree) => {
    const { shouldUse24hTime, timezone } = this.props;

    let slotMoment = moment.unix(timestamp);
    if (timezone) slotMoment = slotMoment.tz(timezone);

    const humanReadableFormat = shouldUse24hTime ? 'H:mm' : 'h:mm a';
    const humanReadableTime = slotMoment.format(humanReadableFormat);

    const isTimeInFuture = slotMoment.isAfter();
    const slotPastLabel = isTimeInFuture ? '' : ' (past)';
    const slotOccupancyLabel =
      isSlotFree ? '' :
      this.isOriginalTimeOfEditedUpdate(timestamp) ? ' (occupied by this post)' :
      ' (occupied)';

    return `${humanReadableTime}${slotOccupancyLabel || slotPastLabel}`;
  };

  // Returns true if we're editing an existing update and the timestamp passed
  // matches the original scheduled time of that update (i.e. the scheduled time
  // before any changes were made to it during this MC session)
  isOriginalTimeOfEditedUpdate = (timestamp) => {
    const { metaData } = this.props;
    const isEditingUpdate = metaData && metaData.updateId !== null;
    return isEditingUpdate && timestamp === metaData.scheduledAt;
  };

  render() {
    const { slots, slot, className } = this.props;
    const EMPTY_OPTION_VALUE = 'empty';

    const slotTimestamp = slot.unix();
    const currentTimestampSeconds = Math.floor(Date.now() / 1000);
    const isSlotTimeInFuture = slotTimestamp > currentTimestampSeconds;

    const isSlotTimestampAvailable = (
      this.isOriginalTimeOfEditedUpdate(slotTimestamp) ||
      (isSlotTimeInFuture &&
        slots.some(({ timestamp, isSlotFree }) => timestamp === slotTimestamp && isSlotFree))
    );
    const selectedSlot = isSlotTimestampAvailable ? slotTimestamp : EMPTY_OPTION_VALUE;

    const hasSlots = slots.length > 0;

    const slotsWithDisabledInfo = slots.map(({ timestamp, isSlotFree }) => {
      const isTimeInFuture = timestamp > currentTimestampSeconds;
      const isDisabled =
        (!isSlotFree || !isTimeInFuture) && !this.isOriginalTimeOfEditedUpdate(timestamp);

      return { timestamp, isSlotFree, isDisabled };
    });

    const areAllOptionsDisabled = slotsWithDisabledInfo.every(({ isDisabled }) => isDisabled);

    return (
      <div className={className}>
        {hasSlots &&
          <Select value={selectedSlot} onChange={this.onSlotChange}>
            <option disabled value={EMPTY_OPTION_VALUE}>
              {areAllOptionsDisabled ? 'Select a slot (all occupied)' : 'Select a slot' }
            </option>
            {slotsWithDisabledInfo.map(({ timestamp, isSlotFree, isDisabled }) => (
              <option value={timestamp} disabled={isDisabled} key={timestamp}>
                {this.getHumanReadableTimeSlotLabel(timestamp, isSlotFree)}
              </option>
            ))}
          </Select>}

        {!hasSlots &&
          <Select disabled value="">
            <option value="">No slots this day</option>
          </Select>}
      </div>
    );
  }
}

export default SlotPicker;
