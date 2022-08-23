import Content from 'brightspot-types/com/psddev/cms/db/Content';
import JavaClass from 'brightspot-types/JavaClass'
import DirectoryItem from 'brightspot-types/com/psddev/cms/db/Directory$Item'
import Site from 'brightspot-types/com/psddev/cms/db/Site';
import JavaField from 'brightspot-types/JavaField';
import JavaRequired from 'brightspot-types/com/psddev/dari/db/Recordable$Required';


export default class Article extends JavaClass('brightspot.example.graphql_restification.Article', Content, DirectoryItem) {

    @JavaRequired
    @JavaField(String)
    headline?: string

    @JavaField(String)
    subheadline?: string

    createPermalink(site: Site): string {
        const Utils = Java.type('com.psddev.dari.util.Utils')
        return Utils.toNormalized(this.headline)
    }
}