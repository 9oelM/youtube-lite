import { x } from "@xstyled/styled-components"
import React, { useCallback } from "react"
import { FC } from "react"
import { NullFallback } from "src/components/Util/WithErrorBoundary"
import { useBoolean } from "src/hooks/useBoolean"
import { enhance } from "src/utilities/essentials"

export type YTLImageProps = Omit<
  React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >,
  `ref`
>

export const YTLImage: FC<YTLImageProps> = enhance<YTLImageProps>(
  (imgProps) => {
    const [isImageLoaded, setImageLoaded] = useBoolean(false)
    const onImageLoad = useCallback(() => {
      setImageLoaded()
    }, [setImageLoaded])

    return (
      <x.figure position="relative">
        <x.img
          {...imgProps}
          onLoad={onImageLoad}
          display={isImageLoaded ? `initial` : `none`}
        />
        {isImageLoaded ? null : (
          <x.div
            w={String(imgProps.width)}
            h={String(imgProps.height)}
            borderColor="text"
            borderWidth={1}
            borderStyle="solid"
            {...{
              bg: `linear-gradient(110deg, #244141 8%, #f5f5f5 18%, #244141 33%)`,
              borderRadius: 5,
              backgroundSize: `200% 100%`,
              animation: `1.5s pulse linear infinite`,
            }}
          ></x.div>
        )}
      </x.figure>
    )
  }
)(NullFallback)
