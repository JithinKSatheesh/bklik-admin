import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { selectMainTheme } from 'app/store/fuse/settingsSlice';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';


export const CommonTabs = (props) => {

  const { tabHead, tabContent, intialVal } = props

  // const mainTheme = useSelector(selectMainTheme);
  // const themeMode = mainTheme.palette.mode
  const [tabId, setTabId] = useState(intialVal);

  const handleTabChange = (e, newValue) => {
    setTabId(newValue);
  };

  const  TabPanel = (props) => {
    const { children, value, tabId, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== tabId}
        id={`full-width-tabpanel-${tabId}`}
        aria-labelledby={`full-width-tab-${tabId}`}
        {...other}
      >
        {value === tabId && <>{children}</>}
      </div>
    );
  }


  useEffect(() => {
    setTabId(intialVal)
  }, [intialVal])

  return (<>
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs
        value={tabId}
        onChange={handleTabChange}
        textColor={'primary'}
        indicatorColor={'primary'}
        aria-label="secondary tabs example"
      >
        {tabHead.map(val => <Tab key={val.id} component={val.link ? Link : "span"} to={`${val?.link ?? ''}`} value={val.id} label={val.label} />)}
      </Tabs>
    </Box>
    {
      tabContent.map(val => (<TabPanel key={val.id} value={val.id} tabId={tabId}>
        {val.component}
      </TabPanel>))
    }
  </>
  )
}
