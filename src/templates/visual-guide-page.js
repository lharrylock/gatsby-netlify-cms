import React from 'react'
import PropTypes from 'prop-types'
import Content, { HTMLContent } from '../components/Content'

export const VisualGuideTemplate = ({
                                   content,
                                   contentComponent,
                                   title
                                 }) => {
  const PageContent = contentComponent || Content;
  return (
    <section className="section section--gradient">
      <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
        {title}
      </h2>
      <PageContent className="content" content={content} />
    </section>
  );
};

VisualGuideTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
};

const VisualGuide = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <VisualGuideTemplate
      contentComponent={HTMLContent}
      title={post.frontmatter.title}
      content={post.html}
    />
  )
};

VisualGuide.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object
  }),
};

export default VisualGuide;

export const pageQuery = graphql`
  query VisualCellPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`;