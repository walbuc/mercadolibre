/* @jsx jsx */
import {jsx, css} from '@emotion/core'

import styled from '@emotion/styled/macro'
import {Link} from '@reach/router'
import Loading from './loading'
import {queries} from 'shared/layout'

export const Section = styled.div(
  {padding: '20px 0'},
  ({theme}) => theme.common.borderBottom,
)

const heading = {
  display: 'block',
  fontFamily: 'inherit',
  fontWeight: '500',
  lineHeight: '1.1',
}
const largerHeading = {
  marginTop: '30px',
  marginBottom: '10px',
}

const smallerHeading = {
  marginTop: '10px',
  marginBottom: '10px',
}

export const Text = styled.span(
  variantStyles({
    tint: {
      faded: ({theme}) => ({color: theme.colors.faded}),
      fadedExtra: ({theme}) => ({color: theme.colors.fadedExtra}),
    },
    size: {
      superheading: [heading, largerHeading, {fontSize: 46}],
      heading: [heading, largerHeading, {fontSize: 30}],
      subheading: [heading, largerHeading, {fontSize: 24}],
      superstandard: [heading, smallerHeading, {fontSize: 18}],
      standard: [heading, {fontSize: 14}],
      substandard: [{fontSize: 12}],
    },
  }),
)

export const Input = styled.input({
  display: 'block',
  width: '100%',
  height: '35px',
  padding: '6px 12px',
  fontSize: '14px',
  lineHeight: '1.42857143',
  color: '#555',
  backgroundColor: '#fff',
  backgroundImage: 'none',
  border: '1px solid #ccc',
  borderRadius: '4px',
  boxShadow: 'inset 0 1px 1px rgba(0, 0, 0, .075)',
  transition: 'border-color ease-in-out .15s, box-shadow ease-in-out .15s',
  ':focus': {
    borderColor: '#66afe9',
    outline: '0',
    boxShadow:
      'inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, .6)',
  },
})

export const Button = styled.button({
  display: 'inline-block',
  padding: '6px 12px',
  marginBottom: '0',
  fontSize: '14px',
  fontWeight: 'normal',
  lineHeight: '1.42857143',
  textAlign: 'center',
  whiteSpace: 'nowrap',
  verticalAlign: 'middle',
  touchAction: 'manipulation',
  cursor: 'pointer',
  userSelect: 'none',
  backgroundImage: 'none',
  border: '1px solid transparent',
  borderRadius: '4px',
  textDecoration: 'none',
  color: '#333',
})

export const PrimaryButton = styled(Button)({
  color: '#fff',
  backgroundColor: '#337ab7',
  borderColor: '#2e6da4',
  '&:hover,&:active,&:focus': {
    color: '#fff',
    backgroundColor: '#286090',
    borderColor: '#204d74',
  },
  ':focus': {
    borderColor: '#122b40',
  },
})

export const ButtonLink = Button.withComponent(Link)
export const PrimaryButtonLink = PrimaryButton.withComponent(Link)

export const Image = styled.img(
  {border: '0', verticalAlign: 'middle'},
  propStyles({
    responsive: {
      display: 'block',
      maxWidth: '100%',
      height: 'auto',
    },
    rounded: {
      borderRadius: '4px',
    },
  }),
)

export const Anchor = styled.a({
  color: '#337ab7',
  textDecoration: 'none',
  '&:active,&:hover': {outline: 0},
  '&:hover,&:focus': {
    color: '#23527c',
    textDecoration: 'underline',
  },
  ':focus': {
    outline: '5px auto -webkit-focus-ring-color',
    outlineOffset: '-2px',
  },
})

export function IsolatedContainer({children, ...props}) {
  return (
    <div
      css={{
        marginTop: 300,
        display: 'flex',
        justifyContent: 'center',
      }}
      {...props}
    >
      <div>{children}</div>
    </div>
  )
}
export const mercadolibre = (
  <div
    css={css`
      @media only (-webkit-min-device-pixel-ratio: 2),
        (min-resolution: 192dpi),
        (min-resolution: 2dppx) {
        background: url('/assets/logo-pt__large_plus@2x.png') no-repeat;
        -webkit-background-size: 134px 34px;
      }
      @media (max-width: 768px) {
        background: none;
        -webkit-background-size: 0;
        height: 0;
        top: 0;
        width: 0;
        margin: 0;
      }
      background: url('/assets/logo_ML.png') no-repeat;
      -webkit-background-size: 134px 34px;
      height: 34px;
      top: 11px;
      width: 134px;
      overflow: hidden;
      text-indent: -999px;
      margin: 10px;
    `}
  />
)

export const shipping = (
  <div
    css={css`
      @media only (-webkit-min-device-pixel-ratio: 2),
        (min-resolution: 192dpi),
        (min-resolution: 2dppx) {
        background: url('/assets/ic_shipping@2x.png.png') no-repeat;
        -webkit-background-size: 32px 32px;
      }
      background: url('/assets/ic_shipping.png') no-repeat;
      -webkit-background-size: 32px 32px;
      height: 32px;
      width: 32px;
      overflow: hidden;
      text-indent: -999px;
      margin: 10px;
    `}
  />
)

export const search = (
  <div
    css={css`
      @media only (-webkit-min-device-pixel-ratio: 2),
        (min-resolution: 192dpi),
        (min-resolution: 2dppx) {
        background: url('/assets/ic_Search@2x.png.png') no-repeat;
        -webkit-background-size: 20px 20px;
      }
      background: url(/assets/ic_Search.png) no-repeat;
      -webkit-background-size: 20px 20px;
      height: 20px;
      width: 20px;
    `}
  />
)

export function LoadingMessagePage({children}) {
  return (
    <IsolatedContainer>
      <div css={{textAlign: 'center'}}>
        <p>
          <Text size="subheading">{children}</Text>
        </p>
        <Loading />
      </div>
    </IsolatedContainer>
  )
}

/**
 * Makes it easier to create an emotion component which
 * accepts props to enable/disable certain styles.
 *
 * accepts an object where the key is a prop and the value
 * is the styles that should be applied if that prop is
 * passed. Returns a function which you pass to a
 * emotionComponentFactory.
 *
 * @param {Object} styles The prop to styles object
 * @return {Function} the dynamic styles function
 */
function propStyles(styles) {
  return function dynamicStyles(props) {
    return Object.keys(props).map(key => {
      if (styles[key]) {
        return applyStyles(styles[key], props)
      }
      return null
    })
  }
}

/**
 * Makes it easier to create an emotion component
 * which accepts enums for certain variants of styles
 *
 * Accepts an object where the key is a variant name
 * (the prop consumers will use) and the value is an
 * object where those keys are the possible values for
 * the variant prop, and the value is the styles to be
 * applied.
 */
function variantStyles(styles) {
  return function dynamicStyles(props) {
    return Object.entries(props).map(([key, value]) => {
      if (styles[key]) {
        return applyStyles(styles[key][value], props)
      }
      return null
    })
  }
}

function applyStyles(styles, props) {
  return typeof styles === 'function'
    ? styles(props)
    : Array.isArray(styles)
    ? styles.map(s => applyStyles(s, props))
    : styles
}

/*
eslint
no-unused-vars: ["warn", {"varsIgnorePattern": "(jsx)"}]
react/react-in-jsx-scope: "off"
*/
