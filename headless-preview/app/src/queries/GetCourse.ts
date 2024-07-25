import { gql } from '@apollo/client'

const GET_COURSE = gql`
  query GetCoursePreview($with: RecordGetInput!, $preview: Boolean!, $previewId: UUID!) {
    Get {
      Record(with: $with) {
        Preview(id: $previewId) @include(if: $preview) {
          View {
            ...PreviewEntryFragment
          }
        }
        View @skip(if: $preview) {
          ...PageEntryFragment
        }
      }
    }
  }

  fragment PageEntryFragment on RecordViews {
    PageEntry {
      data {
        __typename
        ...CourseViewModelFragment
      }
    }
  }

  fragment PreviewEntryFragment on RecordViews {
    PreviewEntry {
      data {
        __typename
        ...CourseViewModelFragment
      }
    }
  }

  fragment CourseViewModelFragment on CourseViewModel {
    _model {
      _id
      title
      description
      ageRange
      subject
    }
    previewEndpointId
  }
`

export default GET_COURSE
