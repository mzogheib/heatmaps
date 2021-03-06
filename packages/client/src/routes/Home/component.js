import React, { useEffect } from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import moment from 'moment'
import { HorizontalLoader } from '@quoll/ui-components'

import DatePicker from '../../components/DatePicker'
import Timeline from '../../components/Timeline'
import Map from '../../components/Map'

const Wrapper = styled.div(
  ({ theme: { media } }) => css`
    flex: 1;
    display: flex;
    position: relative;

    ${media.breakpointDown(media.md)`
      flex-direction: column-reverse;
    `};
  `
)

const Left = styled.div(
  ({ theme: { media } }) => css`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 350px;
    height: 100%;

    ${media.breakpointDown(media.md)`
      max-width: unset;
      width: 100%;
      height: unset;
      flex: 2;
    `};
  `
)

const TimelineWrapper = styled.div`
  position: relative;
  flex: 1;
`

const TimelineBody = styled.div`
  overflow-y: scroll;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`

const MapWrapper = styled.div(
  ({ theme: { media } }) => css`
    position: relative;
    flex: 1;

    ${media.breakpointDown(media.md)`
      flex: 5;
    `};
  `
)
const MapBody = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`

const LoaderWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`

const Home = ({
  onMount,
  date,
  isLoading,
  onDateChange,
  timelineEntries,
  onEntryClick,
  markerData,
  polylineData,
  focussedItem,
}) => {
  useEffect(() => {
    onMount()
  }, [])

  const dateIsToday = (date) => moment(date).isSame(moment(), 'day')

  return (
    <Wrapper>
      <Left>
        <DatePicker
          date={date}
          maxDate={moment().format('YYYY-MM-DD')}
          prevDisabled={isLoading}
          nextDisabled={isLoading || dateIsToday(date)}
          calendarDisabled={isLoading}
          onDateChange={onDateChange}
        />
        <TimelineWrapper>
          <TimelineBody>
            <Timeline entries={timelineEntries} onEntryClick={onEntryClick} />
          </TimelineBody>
        </TimelineWrapper>
      </Left>
      <MapWrapper>
        <MapBody>
          <Map
            markerData={markerData}
            polylineData={polylineData}
            focussedItem={focussedItem}
            onElementSelect={onEntryClick}
          />
        </MapBody>
      </MapWrapper>
      {isLoading && (
        <LoaderWrapper>
          <HorizontalLoader />
        </LoaderWrapper>
      )}
    </Wrapper>
  )
}

Home.propTypes = {
  date: PropTypes.string.isRequired,
  timelineEntries: PropTypes.any.isRequired,
  markerData: PropTypes.any.isRequired,
  polylineData: PropTypes.any.isRequired,
  focussedItem: PropTypes.any.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onMount: PropTypes.func.isRequired,
  onDateChange: PropTypes.func.isRequired,
  onEntryClick: PropTypes.func.isRequired,
}

export default Home
