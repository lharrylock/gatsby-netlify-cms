import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Content, { HTMLContent } from '../components/Content'

export const SubToolTemplate = ({
  content,
  contentComponent,
  helmet,
}) => {
  const PostContent = contentComponent || Content

  return (
    <section className="section">
      {helmet || ''}
      <PostContent content={content} />
    </section>
  )
}

SubToolTemplate.propTypes = {
  content: PropTypes.string.isRequired,
  contentComponent: PropTypes.func,
  scripts: PropTypes.arrayOf(PropTypes.string),
  stylesheets: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string,
  helmet: PropTypes.instanceOf(Helmet),
}

const SubTool = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <SubtoolTemplate
      content={post.html}
      contentComponent={HTMLContent}
      helmet={<Helmet title={post.frontmatter.title} />}
      scripts={post.frontmatter.scripts}
      stylesheets={post.frontmatter.stylesheets}
      title={post.frontmatter.title}
    />
  )
}

SubTool.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default SubTool

export const query = graphql`
  query SubTool {
    markdownRemark {
      html
      frontmatter {
        title
      }
    }
  }
`
