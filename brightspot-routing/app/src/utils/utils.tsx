import { DirectoryData, Maybe } from '../generated'

export const isRedirect = (
  path: string,
  directoryData?: Maybe<DirectoryData>
): boolean => {
  return (
    directoryData?.paths?.some(
      (e) =>
        e?.path === path &&
        (e.type === 'Redirect (Permanent)' || e.type === 'Redirect (Temporary)')
    ) || false
  )
}

export const findPermalink = (directoryData?: Maybe<DirectoryData>): string => {
  return (
    directoryData?.paths?.find((path) => path?.type === 'Permalink')?.path ||
    '/'
  )
}
