import ImageSizeProvider from 'brightspot-types/com/psddev/cms/image/ImageSizeProvider'
import List from 'brightspot-types/java/util/List'

import JavaClass from 'brightspot-types/JavaClass'
import AbstractFilter from 'brightspot-types/com/psddev/dari/util/AbstractFilter'
import FilterChain from 'brightspot-types/javax/servlet/FilterChain'
import ThreadLocalStack from 'brightspot-types/com/psddev/dari/util/ThreadLocalStack'

import Class from 'brightspot-types/java/lang/Class'
import Iterable from 'brightspot-types/java/lang/Iterable'
import Filter from 'brightspot-types/javax/servlet/Filter'
import ThemeFilter from 'brightspot-types/com/psddev/theme/ThemeFilter'
import Auto from 'brightspot-types/com/psddev/dari/util/AbstractFilter$Auto'
import PageFilter from 'brightspot-types/com/psddev/cms/db/PageFilter'
import RoutingFilter from 'brightspot-types/com/psddev/dari/util/RoutingFilter'
import HttpServletRequest from 'brightspot-types/javax/servlet/http/HttpServletRequest'
import HttpServletResponse from 'brightspot-types/javax/servlet/http/HttpServletResponse'
import ClassFinder from 'brightspot-types/com/psddev/dari/util/ClassFinder'

export default class CustomStaticImageSizeProviderFilter extends JavaClass(
  'brightspot.example.images.CustomStaticImageSizeProviderFilter',
  AbstractFilter,
  Auto
) {
  dependencies(): Iterable<Class<Filter>> {
    const result = []
    result.push(ThemeFilter.class)
    return result as unknown as Iterable<Class<Filter>>
  }

  [`updateDependencies(java.lang.Class,java.util.List)`](
    filterClass: Class<AbstractFilter>,
    dependencies: List<Class<Filter>>
  ): void {
    if (
      PageFilter.class.isAssignableFrom(filterClass) ||
      RoutingFilter.class.isAssignableFrom(filterClass)
    ) {
      dependencies.add(this.getClass() as Class<Filter>)
    }
  }

  doRequest(
    request: HttpServletRequest,
    response: HttpServletResponse,
    chain: FilterChain
  ) {
    let providerStack: ThreadLocalStack<ImageSizeProvider> =
      ImageSizeProvider.getCurrentStack()
    const CustomImageSizeProvider = ClassFinder.getClass(
      'brightspot.example.images.CustomImageSizeProvider'
    )
    providerStack.push(new CustomImageSizeProvider()) // warning can be ignored
    try {
      chain.doFilter(request, response)
    } catch (err) {
      console.log(err)
    } finally {
      if (providerStack) {
        providerStack.pop()
      }
    }
  }
}
