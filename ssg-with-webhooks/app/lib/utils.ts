import { DirectoryPath, Maybe } from "../generated/graphql"

export const findPermalink = (paths?: Maybe<Array<Maybe<DirectoryPath>>>): string => {
  return (
    paths?.find((path) => path?.type === 'Permalink')?.path ||
    '/'
  )
}
