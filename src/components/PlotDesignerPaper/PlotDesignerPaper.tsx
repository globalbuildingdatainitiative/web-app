import { ErrorBoundary, ErrorMessage, GlobalBoxPlot, GlobalMap, Paper } from '@components'
import { Grid, Title } from '@mantine/core'
import { useMemo, useState } from 'react'
import { LifeCycleStage, useGetProjectDataForBoxPlotQuery } from '@queries'
import { makeErrorFromOptionalString } from 'lib/uiUtils/errors'


export const PlotDesignerPaper = () => {
  return (
    <Paper data-testid='PlotDesignerPaper'>
      Plot designer
    </Paper>
  )
}
