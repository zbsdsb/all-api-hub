import React from "react"
import { useTranslation } from "react-i18next"

import type { ModelPricing } from "~/services/apiService/common/type"
import {
  formatPriceCompact,
  getEndpointTypesText,
  isTokenBillingType,
  type CalculatedPrice,
} from "~/services/models/utils/modelPricing"

import { ModelItemPerCallPricingView } from "./ModelItemPerCallPricingView"
import { PriceView } from "./ModelItemPicingView"

interface ModelItemPricingProps {
  model: ModelPricing
  calculatedPrice: CalculatedPrice
  exchangeRate: number
  showRealPrice: boolean
  showPricing: boolean
  showRatioColumn: boolean
  showEndpointTypes: boolean
  isAvailableForUser: boolean
}

export const ModelItemPricing: React.FC<ModelItemPricingProps> = ({
  model,
  calculatedPrice,
  exchangeRate,
  showRealPrice,
  showPricing,
  showRatioColumn,
  showEndpointTypes,
  isAvailableForUser,
}) => {
  const { t } = useTranslation("modelList")
  if (!showPricing && !showEndpointTypes) {
    return null
  }

  const tokenBillingType = isTokenBillingType(model.quota_type)
  const perCallPrice = calculatedPrice.perCallPrice
  const endpointTypesText = getEndpointTypesText(model.supported_endpoint_types)

  const endpointTypeMeta = showEndpointTypes ? (
    <div className="flex items-center gap-1.5 sm:gap-2">
      <span className="dark:text-dark-text-tertiary text-xs whitespace-nowrap text-gray-500 sm:text-sm">
        {t("endpointType")}
      </span>
      <span
        className={`text-xs font-medium sm:text-sm ${
          isAvailableForUser
            ? "dark:text-dark-text-primary text-gray-900"
            : "dark:text-dark-text-tertiary text-gray-500"
        }`}
      >
        {endpointTypesText}
      </span>
    </div>
  ) : null

  return (
    <div className="mt-2">
      {showPricing && tokenBillingType ? (
        // 按量计费 - 横向并排显示价格
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6">
          {/* 输入价格 */}
          <PriceView
            calculatedPrice={calculatedPrice}
            showRealPrice={showRealPrice}
            tokenBillingType={tokenBillingType}
            isAvailableForUser={isAvailableForUser}
            formatPriceCompact={formatPriceCompact}
          />

          {/* 倍率显示 */}
          {showRatioColumn && (
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="dark:text-dark-text-tertiary text-xs whitespace-nowrap text-gray-500 sm:text-sm">
                {t("ratio")}
              </span>
              <span
                className={`text-xs font-medium sm:text-sm ${
                  isAvailableForUser
                    ? "dark:text-dark-text-primary text-gray-900"
                    : "dark:text-dark-text-tertiary text-gray-500"
                }`}
              >
                {model.model_ratio}x
              </span>
            </div>
          )}

          {endpointTypeMeta}
        </div>
      ) : showPricing ? (
        perCallPrice && (
          // 按次计费
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span className="dark:text-dark-text-secondary text-xs whitespace-nowrap text-gray-600 sm:text-sm">
              {t("perCall")}
            </span>
            <ModelItemPerCallPricingView
              perCallPrice={perCallPrice}
              isAvailableForUser={isAvailableForUser}
              exchangeRate={exchangeRate}
              showRealPrice={showRealPrice}
              tokenBillingType={tokenBillingType}
            />

            {endpointTypeMeta}
          </div>
        )
      ) : (
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {endpointTypeMeta}
        </div>
      )}
    </div>
  )
}
