/**
 * @generated SignedSource<<a926c7987f2c03cb997357924e610dc0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime'
export type AppGetItemQuery$variables = {
  title?: string | null
}
export type AppGetItemQuery$data = {
  readonly SpqItem: {
    readonly body: string | null
    readonly title: string | null
  } | null
}
export type AppGetItemQuery = {
  response: AppGetItemQuery$data
  variables: AppGetItemQuery$variables
}

const node: ConcreteRequest = (function () {
  var v0 = [
      {
        defaultValue: 'test',
        kind: 'LocalArgument',
        name: 'title',
      },
    ],
    v1 = [
      {
        alias: null,
        args: [
          {
            fields: [
              {
                kind: 'Variable',
                name: 'title',
                variableName: 'title',
              },
            ],
            kind: 'ObjectValue',
            name: 'model',
          },
        ],
        concreteType: 'SpqItem',
        kind: 'LinkedField',
        name: 'SpqItem',
        plural: false,
        selections: [
          {
            alias: null,
            args: null,
            kind: 'ScalarField',
            name: 'body',
            storageKey: null,
          },
          {
            alias: null,
            args: null,
            kind: 'ScalarField',
            name: 'title',
            storageKey: null,
          },
        ],
        storageKey: null,
      },
    ]
  return {
    fragment: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Fragment',
      metadata: null,
      name: 'AppGetItemQuery',
      selections: v1 /*: any*/,
      type: 'Query',
      abstractKey: null,
    },
    kind: 'Request',
    operation: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Operation',
      name: 'AppGetItemQuery',
      selections: v1 /*: any*/,
    },
    params: {
      cacheID: 'd9fbc31146c8d07cc5ed931e999ef793',
      id: null,
      metadata: {},
      name: 'AppGetItemQuery',
      operationKind: 'query',
      text: 'query AppGetItemQuery(\n  $title: String = "test"\n) {\n  SpqItem(model: {title: $title}) {\n    body\n    title\n  }\n}\n',
    },
  }
})()

;(node as any).hash = 'b58a1be7e62ce041ccf31fbfbd33cbf2'

export default node
