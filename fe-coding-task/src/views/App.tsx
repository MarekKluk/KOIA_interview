export function Content() {
  const { savedParameters, updateParameters } = useChartParameters();
  const { chartData } = useChartData();
  console.log(savedParameters);
  return (
    <ContentProvider>
      <div className='container'>
        <h1>Norway Real-Estate Price per Square Meter</h1>
        <Filters chartData={chartData} />
        <Chart updateParameters={updateParameters} chartData={chartData} />
        {savedParameters.length > 0 && (
          <SavedDataTable savedParameters={savedParameters} />
        )}
      </div>
    </ContentProvider>
  );
}
