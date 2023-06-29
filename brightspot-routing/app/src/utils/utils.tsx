import { DirectoryPath, Maybe } from '../generated'

export const isRedirect = (
  path: string,
  directoryPaths?: Maybe<Array<Maybe<DirectoryPath>>>
): boolean => {
  return (
    directoryPaths?.some(
      (e) =>
        e?.path === path &&
        (e.type === 'Redirect (Permanent)' || e.type === 'Redirect (Temporary)')
    ) || false
  )
}

export const findPermalink = (
  paths?: Maybe<Array<Maybe<DirectoryPath>>>
): string => {
  return paths?.find((path) => path?.type === 'Permalink')?.path || '/'
}
