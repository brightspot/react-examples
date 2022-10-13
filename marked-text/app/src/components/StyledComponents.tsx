import React from 'react'

interface Props {
  children: Array<String | React.ReactElement>
}

interface ConvertedElementProps {
  element: String | React.ReactElement
}

const ParagraphComponent = ({ children }: Props) => {
  return (
    <p>
      {children.map((child, index) => (
        <ConvertedElement key={index} element={child} />
      ))}
    </p>
  )
}
const LineBreakComponent = () => {
  return <br />
}
const StrongComponent = ({ children }: Props) => {
  return (
    <strong>
      {children.map((child, index) => (
        <ConvertedElement key={index} element={child} />
      ))}
    </strong>
  )
}
const ItalicComponent = ({ children }: Props) => {
  return <i>{children}</i>
}
const UnderlineComponent = ({ children }: Props) => {
  return <u>{children}</u>
}
const StrikethroughComponent = ({ children }: Props) => {
  return <s>{children}</s>
}
const SubScriptComponent = ({ children }: Props) => {
  return <sub>{children}</sub>
}
const SuperScriptComponent = ({ children }: Props) => {
  return <sup>{children}</sup>
}
const OLComponent = ({ children }: Props) => {
  return (
    <ol>
      {children.map((child, index) => (
        <ConvertedElement key={index} element={child} />
      ))}
    </ol>
  )
}
const ULComponent = ({ children }: Props) => {
  return (
    <ul>
      {children.map((child, index) => (
        <ConvertedElement key={index} element={child} />
      ))}
    </ul>
  )
}
const LiComponent = ({ children }: Props) => {
  return <li>{children}</li>
}

const ConvertedElement = ({ element }: ConvertedElementProps) => {
  return <>{element}</>
}

export {
  ParagraphComponent,
  LineBreakComponent,
  StrongComponent,
  ItalicComponent,
  UnderlineComponent,
  SubScriptComponent,
  SuperScriptComponent,
  StrikethroughComponent,
  OLComponent,
  ULComponent,
  LiComponent,
}
