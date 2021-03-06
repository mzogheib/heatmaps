import styled, { css } from 'styled-components'
import { lighten, darken } from 'polished'
import PropTypes from 'prop-types'

const makeStyle = ({ font, backgroundColor, bold, disabled, noHitbox }) => css`
  border: none;
  border-radius: 4px;

  font-family: ${font.family};
  font-size: 14px;
  font-weight: ${bold ? 500 : null};

  height: ${noHitbox ? 'unset' : '36px'};
  min-width: ${noHitbox ? 'unset' : '120px'};
  padding: ${noHitbox ? 0 : '0 15px'};

  background-color: ${disabled
    ? lighten(0.1, backgroundColor)
    : backgroundColor};
  color: ${disabled ? lighten(0.4, font.color) : font.color};
  cursor: ${disabled ? 'unset' : 'pointer'};

  &:hover {
    background-color: ${!disabled && darken(0.05, backgroundColor)};
  }
`

const defaultStyle = ({ theme: { colors, font }, disabled }) => css`
  ${makeStyle({
    font,
    backgroundColor: colors.whiteSmoke,
    disabled,
  })};
`

const primaryStyle = ({ theme: { colors, font }, disabled }) => css`
  ${makeStyle({
    font,
    backgroundColor: colors.mediumAquamarine,
    disabled,
  })};
`

const plainStyle = ({ theme: { colors, font }, disabled }) => css`
  ${makeStyle({
    font,
    backgroundColor: colors.transparent,
    bold: true,
    disabled,
    noHitbox: true,
  })};
`

const propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  type: PropTypes.string,
}

const defaultProps = {
  disabled: false,
  type: 'button',
}

// Choosing to create three separate styled components instead of the base
// one, which could then be extended by Primary and Plain.
// This avoids classes that have multiple overrides. On the other hand,
// it ends up creating three sets of distinct styles.
const Button = {
  ...styled.button(defaultStyle),
  displayName: 'Button',
  propTypes,
  defaultProps,
}
Button.Default = Button

Button.Primary = {
  ...styled.button(primaryStyle),
  displayName: 'Button.Primary',
  propTypes,
  defaultProps,
}

Button.Plain = {
  ...styled.button(plainStyle),
  displayName: 'Button.Plain',
  propTypes,
  defaultProps,
}

export default Button
