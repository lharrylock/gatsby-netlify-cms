import React from 'react'
import PropTypes from 'prop-types'
import { SubToolTemplate } from '../../templates/sub-tool'

const SubToolPreview = ({ entry, widgetFor }) => (
  <SubToolTemplate
    content={widgetFor('body')}
    scripts={entry.getIn(['data', 'scripts'])}
    stylesheets={entry.getIn['data', 'stylesheets']}
    title={entry.getIn(['data', 'title'])}
  />
)

SubToolPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default SubToolPreview
