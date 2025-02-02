import React, { Component, useState } from 'react';
import Modals from '@iso/components/Feedback/Modal';
import Popover from '@iso/components/uielements/popover';
import { getData, setCookie, getCookie } from 'CommonFunctions'
import { ModalContent } from '../Feedback/Modal/Modal.styles';
import { Layout, Button, Input, Breadcrumb, Select } from 'antd';
import "./styles.css";
import { SearchOutlined, LeftOutlined , RightOutlined } from '@ant-design/icons';
import heartBlank from '@iso/assets/images/heart-blank.png';
import heartFull from '@iso/assets/images/heart-full.png';
import imageDO from '@iso/assets/images/do.png';
import imageAWS from '@iso/assets/images/aws.png';
import imageGCP from '@iso/assets/images/gcp.png';
import imageAZURE from '@iso/assets/images/azure.png';
import imageHETZNER from '@iso/assets/images/hetzner.png';
import imageVULTR from '@iso/assets/images/vultr.png';
import imageLeaseweb from '@iso/assets/images/leaseweb.png';
import imageDatacamp from '@iso/assets/images/datacamp.png';
import imageComcast from '@iso/assets/images/comcast.png';
import imageChoopa from '@iso/assets/images/choopa.png';
import imageChartercoms from '@iso/assets/images/chartercoms.png';
import imageATandT from '@iso/assets/images/atandt.png';
import imageZenlayer from '@iso/assets/images/zenlayer.png';

import binance from '@iso/assets/images/binance.png';
import eth from '@iso/assets/images/eth.png';
import bitcoin from '@iso/assets/images/bitcoin.png';
import litecoin from '@iso/assets/images/litecoin.png';
import bitcoincash from '@iso/assets/images/bitcoincash.png';
import dogecoin from '@iso/assets/images/dogecoin.png';
import gaia from '@iso/assets/images/atom.png';
import thornode from '@iso/assets/images/thornode.svg';
import blockIcon from '@iso/assets/images/overview/block_icon.svg';
import highTradingIcon from '@iso/assets/images/overview/24high_trading.svg';
import lowTradingIcon from '@iso/assets/images/overview/24low_trading.svg';
import bondIcon from '@iso/assets/images/overview/Bond_icon.svg';
import churnsIcon from '@iso/assets/images/overview/churns_icon.svg';
import marcketCapIcon from '@iso/assets/images/overview/marcket_Cap.svg';
import mcapRankIcon from '@iso/assets/images/overview/mcap_rank.svg';
import runeUsdtIcon from '@iso/assets/images/overview/rune_usdt.svg';
import timeIcon from '@iso/assets/images/overview/time_icon.svg';
import totalSupplyIcon from '@iso/assets/images/overview/total_supply.svg';
import loadingIcon from '@iso/assets/images/overview/loading.png';
import githubIcon from '@iso/assets/images/overview/github_link_icon.svg';
import twitterIcon from '@iso/assets/images/overview/twitter_link_icon.svg';
import liquifyLogo from '@iso/assets/images/overview/liquify_logo.svg';
import threeDotsIcon from '@iso/assets/images/overview/dots_three_circle.svg';
import powerIcon from '@iso/assets/images/overview/power.svg';
import activeIcon from '@iso/assets/images/overview/active_icon.svg';
import VisibleColumn from '@iso/components/VisibleColumn/VisibleColumn';
import arrowDownIcon from '@iso/assets/images/overview/arrow-down.svg';

const leaveIcon = <svg style={{marginTop: 5}} focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="20" height="20" viewBox="0 0 30 30" aria-hidden="true" className="sfg"><path d="M6,30H18a2.0023,2.0023,0,0,0,2-2V25H18v3H6V4H18V7h2V4a2.0023,2.0023,0,0,0-2-2H6A2.0023,2.0023,0,0,0,4,4V28A2.0023,2.0023,0,0,0,6,30Z"></path><path d="M20.586 20.586L24.172 17 10 17 10 15 24.172 15 20.586 11.414 22 10 28 16 22 22 20.586 20.586z"></path></svg>

const { Header, Footer, Content } = Layout;

const headerStyle = {cursor: 'pointer', padding: '12px 15px', fontSize: 15, color: '#ffffff', backgroundColor: 'rgba(24, 34, 51, 0.4)', height: 55, fontWeight: 600}
const tdStyle = {minWidth: 60, textAlign: 'right', fontSize: 14, padding: '10px 15px'}
const trStyle = {height: 45}
const iconStyle = {minWidth: 25, padding: 5, paddingLeft: 10, paddingRight: 10, padding: '10px 15px'}


async function copyToClipWithPopup(msg, ip) {
  copyToClipboard(ip)
  popUpModal(msg, ip)
}

const copyToClipboard = str => {
  if (navigator && navigator.clipboard && navigator.clipboard.writeText)
    return navigator.clipboard.writeText(str);
  return Promise.reject('The Clipboard API is not available.');
};

function popUpModal(msg, ip) {
  Modals.info({
    title: <h3>Success</h3>,
    content: (
      <ModalContent>
        <p>
          <strong>{`${msg} `}</strong> {`${ip}`}
        </p>
      </ModalContent>
    ),
    onOk() {},
    okText: 'OK',
    cancelText: 'Cancel',
    className: 'feedback-modal'
  });
}

const SortIcon = ({ sortBy, column, sortDirection }) => {
  if (sortBy == column) {
    return <img className={`sort-icon ${sortDirection}`} src={arrowDownIcon} width={12} />
  }
  return null
}

const Icons = ({address, ip_address, addToFav, whichHeart}) => {
  const firstURL = `https://thornode.ninerealms.com/thorchain/node/${address}`
  const secondURL = `https://viewblock.io/thorchain/address/${address}`
  return (
    <span style={{height: 20, marginLeft: 5}} className="icons-wrapper">
      <Popover
        content={'Explore Node'}
        trigger="hover"
      >
      <a href={secondURL} target="_blank" rel="noopener noreferrer" style={{marginLeft: 5}}>
        <svg focusable="false" preserveAspectRatio="xMidYMid meet" style={{verticalAlign: 'middle'}} width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.21201 6.12094C7.93815 5.79037 7.59622 5.52244 7.20939 5.33531C6.82257 5.14818 6.3999 5.04623 5.97006 5.03638C5.54022 5.02653 5.11326 5.10902 4.71815 5.27823C4.32303 5.44745 3.969 5.69944 3.68006 6.01712L1.96996 7.89664C1.45171 8.48651 1.18641 9.25576 1.23118 10.0387C1.27595 10.8217 1.62723 11.5557 2.20934 12.0827C2.79146 12.6097 3.55784 12.8875 4.34342 12.8562C5.12901 12.825 5.87094 12.4872 6.40942 11.9157L7.38417 10.8444" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M5.39864 7.52442C5.63159 7.8849 5.93954 8.19119 6.3016 8.42251C6.66366 8.65384 7.07135 8.80479 7.49704 8.86513C7.92272 8.92546 8.35644 8.89377 8.76876 8.77221C9.18109 8.65064 9.56238 8.44204 9.88678 8.16056L11.8067 6.49526C12.3909 5.97045 12.7451 5.23775 12.793 4.45497C12.8409 3.67219 12.5787 2.90196 12.0628 2.31017C11.5469 1.71838 10.8186 1.35238 10.0348 1.291C9.25103 1.22962 8.47442 1.47778 7.87227 1.98201L6.77194 2.93082" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </a>
      </Popover>
      <Popover
      content={'Thornode API'}
      trigger="hover"
    >
      <a href={firstURL} target="_blank" rel="noopener noreferrer" style={{marginLeft: 5}}>
        <svg focusable="false" preserveAspectRatio="xMidYMid meet" style={{verticalAlign: 'middle'}} width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.0209 5.95871L9.20835 6.77121L6.22919 3.79204L7.04169 2.97954C7.44794 2.57327 8.93752 1.8962 10.0209 2.97954C11.1042 4.06288 10.4271 5.55243 10.0209 5.95871Z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M11.375 1.625L10.0208 2.97917" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M2.97917 7.04199L3.79167 6.22949L6.77083 9.20866L5.95833 10.0212C5.55208 10.4274 4.0625 11.1045 2.97917 10.0212C1.89583 8.93783 2.57292 7.44827 2.97917 7.04199Z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M6.22919 8.66634L7.31252 7.58301" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M1.625 11.3747L2.97917 10.0205" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M4.33331 6.77083L5.41665 5.6875" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </a>
      </Popover>
      <Popover
        content={ip_address}
        title={'IP Address'}
        trigger="hover"
      >
        <span style={{cursor: 'pointer', marginLeft: 5}} onClick={()=>copyToClipWithPopup('IP Copied to clipboard:', ip_address)}>
          <svg focusable="false" preserveAspectRatio="xMidYMid meet" style={{verticalAlign: 'middle'}} width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.2916 1.08301H5.95831C5.81465 1.08301 5.67688 1.14008 5.5753 1.24166C5.47371 1.34324 5.41665 1.48102 5.41665 1.62467C5.41665 1.76833 5.47371 1.90611 5.5753 2.00769C5.67688 2.10927 5.81465 2.16634 5.95831 2.16634H10.2916C10.4353 2.16634 10.5731 2.22341 10.6747 2.32499C10.7762 2.42657 10.8333 2.56435 10.8333 2.70801V6.49967H1.62498C1.48132 6.49967 1.34355 6.55674 1.24196 6.65833C1.14038 6.75991 1.08331 6.89768 1.08331 7.04134V8.12467C1.08331 8.55565 1.25452 8.96898 1.55926 9.27372C1.86401 9.57847 2.27734 9.74967 2.70831 9.74967H4.33331V10.833H2.70831C2.56465 10.833 2.42688 10.8901 2.3253 10.9917C2.22371 11.0932 2.16665 11.231 2.16665 11.3747C2.16665 11.5183 2.22371 11.6561 2.3253 11.7577C2.42688 11.8593 2.56465 11.9163 2.70831 11.9163H10.2916C10.4353 11.9163 10.5731 11.8593 10.6747 11.7577C10.7762 11.6561 10.8333 11.5183 10.8333 11.3747C10.8333 11.231 10.7762 11.0932 10.6747 10.9917C10.5731 10.8901 10.4353 10.833 10.2916 10.833H8.66665V9.74967H10.2916C10.7226 9.74967 11.1359 9.57847 11.4407 9.27372C11.7454 8.96898 11.9166 8.55565 11.9166 8.12467V2.70801C11.9166 2.27703 11.7454 1.86371 11.4407 1.55896C11.1359 1.25421 10.7226 1.08301 10.2916 1.08301ZM7.58331 10.833H5.41665V9.74967H7.58331V10.833ZM10.8333 8.12467C10.8333 8.26833 10.7762 8.40611 10.6747 8.50769C10.5731 8.60927 10.4353 8.66634 10.2916 8.66634H2.70831C2.56465 8.66634 2.42688 8.60927 2.3253 8.50769C2.22371 8.40611 2.16665 8.26833 2.16665 8.12467V7.58301H10.8333V8.12467Z" fill="currentColor"/>
            <path d="M3.9044 3.30042L2.78573 4.75234L1.66706 3.30042C1.36512 2.90853 1.36759 2.45798 1.57491 2.09161C1.78501 1.72031 2.21379 1.42871 2.78573 1.42871C3.35767 1.42871 3.78646 1.72031 3.99656 2.09161C4.20388 2.45798 4.20634 2.90853 3.9044 3.30042Z" stroke="currentColor"/>
            <path d="M1.85712 5.57129H3.71426" stroke="currentColor" stroke-linecap="round"/>
          </svg>
        </span>
      </Popover>
      <img alt="#" onClick={()=>addToFav(address)} src={whichHeart(address)} style={{ cursor:'pointer', marginLeft: 5, marginTop: 2, width: 15, height: 15}}/>
    </span>
)
}

const GlobalData = ({ globalData, animateBlockCount, state}) => {

  let timeToDisplay = '';
  let msgTitle = ''
  if (globalData?.churnTry && globalData?.retiring === 'false') {
    msgTitle = '(CHURN) RETRY IN'
    timeToDisplay = `${globalData?.timeUntilRetry?.days}d ${globalData?.timeUntilRetry?.hours}h ${globalData?.timeUntilRetry?.minutes}m`
  } else if (globalData?.retiring === 'true') {
    msgTitle = '(CHURN) CURRENTLY CHURNING'
    timeToDisplay = 'Churning'
  } else {
    msgTitle = '(CHURN) TIME UNTIL'
    timeToDisplay = `${globalData?.timeUntilChurn?.days}d ${globalData?.timeUntilChurn?.hours}h ${globalData?.timeUntilChurn?.minutes}m`
  }

  return (
    <>
      <div className='overview-item'>
        <img alt="#" src={blockIcon} className='overview-item__icon'/>
        <div className='overview-item__value'>
          <div className='overview-item__value-title'>CURRENT BLOCK</div>
          <div className='overview-item__value-value'>{parseInt(globalData.maxHeight).toLocaleString()}</div>
        </div>
      </div>
      <div className='overview-item'>
        <img alt="#" src={churnsIcon} className='overview-item__icon'/>
        <div className='overview-item__value'>
          <div className='overview-item__value-title'>{msgTitle} </div>
          <div className='overview-item__value-value'>{timeToDisplay}</div>
        </div>
      </div>
      <div className='overview-item'>
        <img alt="#" src={bondIcon} className='overview-item__icon'/>
        <div className='overview-item__value'>
          <div className='overview-item__value-title'>TOTAL BONDED VALUE</div>
          <div className='overview-item__value-value'>ᚱ{state.activeNodes.length>0 ? parseInt((state.activeNodes.map(item => item.bond).reduce((prev, next) => prev + next))/100000000).toLocaleString() : '0'}</div>
        </div>
      </div>
      <div className='overview-item'>
        <img alt="#" src={marcketCapIcon} className='overview-item__icon'/>
        <div className='overview-item__value'>
          <div className='overview-item__value-title'>MARKET CAP</div>
          <div className='overview-item__value-value'>${globalData?.coingecko?.market_cap?.toLocaleString()}</div>
        </div>
      </div>
      <div className='overview-item'>
        <img alt="#" src={timeIcon} className='overview-item__icon'/>
        <div className='overview-item__value'>
          <div className='overview-item__value-title'>24 HR VOLUME</div>
          <div className='overview-item__value-value'>${globalData?.coingecko?.total_volume?.toLocaleString()}</div>
        </div>
      </div>
      <div className='overview-item'>
        <img alt="#" src={bondIcon} className='overview-item__icon'/>
        <div className='overview-item__value'>
          <div className='overview-item__value-title'>MAX EFFECTIVE BOND</div>
          <div className='overview-item__value-value'>ᚱ{parseInt(globalData.maxEffectiveStake/100000000).toLocaleString()}</div>
        </div>
      </div>
    </>
  )
}

const CoinGeckoData = ({ globalData }) => {
  return (
    <>
      <div className='overview-item'>
        <img alt="#" src={runeUsdtIcon} className='overview-item__icon'/>
        <div className='overview-item__value'>
          <div className='overview-item__value-title'>PRICE</div>
          <div className='overview-item__value-value'>${globalData?.coingecko?.current_price?.toLocaleString()}</div>
        </div>
      </div>
      <div className='overview-item'>
        <img alt="#" src={highTradingIcon} className='overview-item__icon'/>
        <div className='overview-item__value'>
          <div className='overview-item__value-title'>24 HR HIGH</div>
          <div className='overview-item__value-value'>${globalData?.coingecko?.high_24h}</div>
        </div>
      </div>
      <div className='overview-item'>
        <img alt="#" src={lowTradingIcon} className='overview-item__icon'/>
        <div className='overview-item__value'>
          <div className='overview-item__value-title'>24 HR LOW</div>
          <div className='overview-item__value-value'>${globalData?.coingecko?.low_24h}</div>
        </div>
      </div>
      <div className='overview-item'>
        <img alt="#" src={mcapRankIcon} className='overview-item__icon'/>
        <div className='overview-item__value'>
          <div className='overview-item__value-title'>MARKET CAP RANK</div>
          <div className='overview-item__value-value'>{globalData?.coingecko?.market_cap_rank}</div>
        </div>
      </div>
      <div className='overview-item'>
        <img alt="#" src={totalSupplyIcon} className='overview-item__icon'/>
        <div className='overview-item__value'>
          <div className='overview-item__value-title'>TOTAL SUPPLY</div>
          <div className='overview-item__value-value'>ᚱ{globalData?.coingecko?.total_supply?.toLocaleString()}</div>
        </div>
      </div>
    </>
  )
}


const ReturnIspImage = ({isp}) => {

  const style = {width: 25, height: 25}

  if (isp ==='Amazon.com, Inc.' || isp === 'Amazon Technologies Inc.' || isp === 'Amazon.com'){
    return <img alt="#" src={imageAWS} style={style}/>
  }
  if (isp ==='DigitalOcean, LLC' || isp==='DigitalOcean'){
    return <img alt="#" src={imageDO} style={style}/>
  }
  if (isp ==='Google LLC'){
    return <img alt="#" src={imageGCP} style={style}/>
  }

  if (isp ==='Microsoft Corporation'){
    return <img alt="#" src={imageAZURE} style={style}/>
  }

  if (isp ==='Hetzner Online GmbH'){
    return <img alt="#" src={imageHETZNER} style={style}/>
  }

  if (isp ==='The Constant Company' || isp === 'The Constant Company, LLC'){
    return <img alt="#" src={imageVULTR} style={style}/>
  }

  if (isp ==='Leaseweb UK Limited' || isp === 'Leaseweb USA, Inc.'){
    return <img alt="#" src={imageLeaseweb} style={style}/>
  }

  if (isp ==='Datacamp Limited'){
    return <img alt="#" src={imageDatacamp} style={style}/>
  }

  if (isp ==='Comcast Cable Communications, LLC'){
    return <img alt="#" src={imageComcast} style={style}/>
  }

  if (isp ==='Choopa'){
    return <img alt="#" src={imageChoopa} style={style}/>
  }

  if (isp ==='Charter Communications Inc'){
    return <img alt="#" src={imageChartercoms} style={style}/>
  }

  if (isp ==='AT&T Services, Inc.'){
    return <img alt="#" src={imageATandT} style={style}/>
  }
  
  if (isp ==='Zenlayer Inc'){
    return <img alt="#" src={imageZenlayer} style={style}/>
  }

  return '-'
}

const ChainTD = ({chain, obchains, maxChainHeights}) => {
  const delta = obchains[chain]-maxChainHeights[chain]
  return (
    <td style={{ textAlign: 'center', color: (delta<-5 || isNaN(delta)) ? 'red' : null}}>{delta===0 ? 'OK' : delta.toString()}</td>
  )
}

const BondProviderPopOver = ({data}) => {
  const totalBond = data.map(item=>parseInt(item.bond)).reduce((a, b) => a + b, 0)

  const d = data.map((item,index) => {
    return (
    <div key={index} style={{width: 200, display: 'flex', justifyContent: 'space-between'}}>
      <span>{item.bond_address.substring(item.bond_address.length-4, item.bond_address.length)}</span>
      <span>{((item.bond/totalBond)*100).toFixed(2)}%</span>
      <span>ᚱ{parseInt((item.bond/100000000).toFixed()).toLocaleString()}</span>
    </div>
  )
  })
  return d
}

const NodeTable = ({nodeData, clickSortHeader, sortColour, maxChainHeights, chains, addToFav, whichHeart, visibleColumns = {...defaulColumns}, sortBy = '', sortDirection = ''}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(100);

  const totalPages = Math.ceil(nodeData.length / itemsPerPage);
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const handleNext = () => {
    setCurrentPage((prevPage) => (prevPage === totalPages ? prevPage : prevPage + 1));
  };

  const handlePrev = () => {
    setCurrentPage((prevPage) => (prevPage === 1 ? prevPage : prevPage - 1));
  };

  const renderPageNumbers = pageNumbers.map((number) => {
    return (
      <li
        key={number}
        id={number}
        onClick={handleClick}
        className={`paging-item ${currentPage === number ? "active" : null}`}
      >
        {number}
      </li>
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = nodeData.slice(indexOfFirstItem, indexOfLastItem);

  const getHeaderClassName = (key) => {
    return visibleColumns && visibleColumns[key] ? 'tableHeader' : 'tableHeader hidden'
  };

  const getCellClassName = (key) => {
    return visibleColumns && visibleColumns[key] ? '' : 'hidden'
  };

  const updatePagingItem = (value) => {
    setItemsPerPage(value)
  };
  return (<>
  <div className='item-to-show'>
    <span>Nodes per page:</span>

    <Select
      defaultValue={itemsPerPage}
      showSearch={false}
      onChange={updatePagingItem}
      style={{ width: 80, borderRadius: 10 }}
      dropdownMatchSelectWidth={false}
      options={[
        { value: '10', label: '10' },
        { value: '25', label: '25' },
        { value: '50', label: '50' },
        { value: '100', label: '100'},
      ]}
    />
    </div>
    <div className='data-table-wrapper'>
      <div style={{width: '100%', overflowX: 'auto'}}>
        <table style={{borderWidth: 1.1, borderColor: 'rgba(0,0,0,1)', width: '100%'}}>
          <thead>
            <tr style={{borderStyle: 'solid', borderWidth: 1.1, borderColor: 'rgba(0,0,0,1)', color: 'black', textAlign: 'center', marginRight: 10}}>
              <th style={{ backgroundColor: 'rgba(24, 34, 51, 0.4)' }}></th>
              <th className={getHeaderClassName('nodes')} style={{ ...headerStyle, color: sortColour('node_address'), textAlign: 'center', minWidth: 100 }}><span onClick={() => clickSortHeader('node_address')}>Validator Nodes<SortIcon column={'node_address'} sortBy={sortBy} sortDirection={sortDirection} /></span></th>
              <th className={getHeaderClassName('age')} style={{ ...headerStyle, color: sortColour('age'), textAlign: 'center', minWidth: 90 }}><span onClick={() => clickSortHeader('age')}>Age<SortIcon column={'age'} sortBy={sortBy} sortDirection={sortDirection} /></span></th>
              <th className={getHeaderClassName('action')} style={{ ...headerStyle, color: sortColour('action'), textAlign: 'center', minWidth: 100 }}><span onClick={() => clickSortHeader('action')}>Action<SortIcon column={'action'} sortBy={sortBy} sortDirection={sortDirection} /></span></th>
              <th className={getHeaderClassName('isp')} style={{ ...headerStyle, color: sortColour('isp'), textAlign: 'center', minWidth: 50 }}><span onClick={() => clickSortHeader('isp')}>ISP<SortIcon column={'isp'} sortBy={sortBy} sortDirection={sortDirection} /></span></th>
              <th className="tableHeader" style={{ ...headerStyle, color: sortColour('location'), textAlign: 'center', minWidth: 100 }}><span onClick={() => clickSortHeader('location')}>Location<SortIcon column={'location'} sortBy={sortBy} sortDirection={sortDirection} /></span></th>
              <th className={getHeaderClassName('bond')} style={{ ...headerStyle, color: sortColour('bond'), minWidth: 75 }}><span onClick={() => clickSortHeader('bond')}>Bond<SortIcon column={'bond'} sortBy={sortBy} sortDirection={sortDirection} /></span></th>
              <th className={getHeaderClassName('providers')} style={{ ...headerStyle, color: sortColour('bond_providers'), textAlign: 'center' }}><span onClick={() => clickSortHeader('bond_providers')}>Providers<SortIcon column={'bond_providers'} sortBy={sortBy} sortDirection={sortDirection} /></span></th>
              <th className={getHeaderClassName('rewards')} style={{ ...headerStyle, color: sortColour('current_award'), textAlign: 'center' }}><span onClick={() => clickSortHeader('current_award')}>Rewards<SortIcon column={'current_award'} sortBy={sortBy} sortDirection={sortDirection} /></span></th>
              <th className={getHeaderClassName('apy')} style={{ ...headerStyle, color: sortColour('apy') }}><span onClick={() => clickSortHeader('apy')}>APY<SortIcon column={'apy'} sortBy={sortBy} sortDirection={sortDirection} /></span></th>
              <th className={getHeaderClassName('slashes')} style={{ ...headerStyle, color: sortColour('slash_points'), textAlign: 'center' }}><span onClick={() => clickSortHeader('slash_points')}>Slashes<SortIcon column={'slash_points'} sortBy={sortBy} sortDirection={sortDirection} /></span></th>
              <th className={getHeaderClassName('score')} style={{ ...headerStyle, color: sortColour('score') }}><span onClick={() => clickSortHeader('score')}>Score<SortIcon column={'score'} sortBy={sortBy} sortDirection={sortDirection} /></span></th>
              <th className={getHeaderClassName('version')} style={{ ...headerStyle, color: sortColour('version') }}><span onClick={() => clickSortHeader('version')}>Version<SortIcon column={'version'} sortBy={sortBy} sortDirection={sortDirection} /></span></th>
              <th className="tableHeader" style={{ ...headerStyle, color: sortColour('leave'), textAlign: 'center' }}><span onClick={() => clickSortHeader('leave')}>{leaveIcon}<SortIcon column={'leave'} sortBy={sortBy} sortDirection={sortDirection} /></span></th>
              <th className={getHeaderClassName('rpc')} style={{ ...headerStyle, textAlign: 'center' }}>RPC</th>
              <th className={getHeaderClassName('bfr')} style={{ ...headerStyle, textAlign: 'center' }}>BFR</th>

              {chains &&
                <>
                  <th className="tableHeader" style={{...headerStyle, ...iconStyle}}><img alt="#" src={binance} style={{width: 25, height: 25, display: 'block', margin: 'auto'}}/></th>
                  <th className="tableHeader" style={{...headerStyle, ...iconStyle}}><img alt="#" src={bitcoin} style={{width: 25, height: 25, display: 'block', margin: 'auto'}}/></th>
                  <th className="tableHeader" style={{...headerStyle, ...iconStyle}}><img alt="#" src={eth} style={{width: 25, height: 25, display: 'block', margin: 'auto'}}/></th>
                  <th className="tableHeader" style={{...headerStyle, ...iconStyle}}><img alt="#" src={litecoin} style={{width: 25, height: 25, display: 'block', margin: 'auto'}}/></th>
                  <th className="tableHeader" style={{...headerStyle, ...iconStyle}}><img alt="#" src={bitcoincash} style={{width: 25, height: 25, display: 'block', margin: 'auto'}}/></th>
                  <th className="tableHeader" style={{...headerStyle, ...iconStyle}}><img alt="#" src={dogecoin} style={{width: 25, height: 25, display: 'block', margin: 'auto'}}/></th>
                  <th className="tableHeader" style={{...headerStyle, ...iconStyle}}><img alt="#" src={gaia} style={{width: 25, height: 25, display: 'block', margin: 'auto'}}/></th>
                </>
              }
            </tr>
          </thead>
          <tbody>
          {currentItems.map((item, index) => (
            <tr key={index} style={{...trStyle}}>
              <td style={{backgroundColor: 'rgba(24, 34, 51, 0.4)',  minWidth: 35, width: 50, paddingLeft: 5}}>{index+1}</td>
              <td className={getCellClassName('nodes')} style={{...tdStyle, textAlign: 'center', minWidth: 200}}>
                <Popover
                  content={item.node_address}
                  title={'Thornode Address'}
                  trigger="hover"
                >
                <span style={{cursor: 'pointer'}} className="nodeaddress" onClick={()=>copyToClipWithPopup('Node address copied to clipboard:', item.node_address)}>
                  {`...${item.node_address.substring(item.node_address.length - 4)}`}

                </span>
                </Popover>
                <Icons address={item.node_address} ip_address={item.ip_address} addToFav={addToFav} whichHeart={whichHeart}/>
              </td>
              <td className={getCellClassName('age')} style={{...tdStyle, textAlign: 'center'}}>{item.age.toFixed(2)}</td>
              <td className={getCellClassName('action')} style={{...tdStyle, textAlign: 'center', fontSize: 12}}>{item.action}</td>
              <td className={getCellClassName('isp')} style={{...tdStyle, textAlign: 'center'}}>
                <Popover
                  content={item.isp}
                  title={'Provider'}
                  trigger="hover"
                >
                  <span style={{cursor: 'pointer'}}><ReturnIspImage isp={item.isp}/></span>
                </Popover>
              </td>
              <td style={{...tdStyle, textAlign: 'center', fontSize: 12}}>{item.location}</td>
              <td className={getCellClassName('bond')} style={{...tdStyle, textAlign: 'center'}}>ᚱ{parseInt((item.bond/100000000).toFixed()).toLocaleString()}</td>
              <td className={getCellClassName('providers')} style={{...tdStyle, textAlign: 'center'}}> <Popover
                            content={<BondProviderPopOver data={item.bond_providers.providers}/>}
                            title={'Bond Providers'}
                            trigger="hover"
                          ><span style={{cursor: 'pointer'}}>{item.bond_providers.providers.length}</span>
                    </Popover>
                </td>
              <td className={getCellClassName('rewards')} style={{...tdStyle, textAlign: 'center'}}>ᚱ{parseInt((item.current_award/100000000).toFixed()).toLocaleString()}</td>
              <td className={getCellClassName('apy')} style={{...tdStyle, textAlign: 'center'}}>{item.apy}</td>
              <td className={getCellClassName('slashes')} style={{...tdStyle, textAlign: 'center'}}>{parseInt(item.slash_points).toLocaleString()}</td>
              <td className={getCellClassName('score')} style={{...tdStyle, textAlign: 'center'}}>{item.score}</td>
              <td className={getCellClassName('version')} style={{...tdStyle, textAlign: 'center'}}>{item.version}</td>
              {/* <td className={getCellClassName('rpc')} style={{...tdStyle, textAlign: 'center'}}><a style={{color: 'rgba(0,0,0,0.85)'}} href={`http://${item.ip_address}:27147/health?`} target="_blank" rel="noopener noreferrer">{item.rpc === 'true' ? '*' : 'BAD'}</a></td> */}
              <td style={{...tdStyle, textAlign: 'center'}}>{item.forced_to_leave === 1 || item.requested_to_leave === 1 ? 'yes' : '-'}</td>
              <td className={getCellClassName('rpc')} style={{...tdStyle, textAlign: 'center'}}><a style={{color: 'rgba(0,0,0,0.85)'}} href={`http://${item.ip_address}:27147/health?`} target="_blank" rel="noopener noreferrer">{item.rpc !== "null" ? '*' : 'Bad'}</a></td>
              <td className={getCellClassName('bfr')} style={{...tdStyle, textAlign: 'center'}}><a style={{color: 'rgba(0,0,0,0.85)'}} href={`http://${item.ip_address}:6040/p2pid`} target="_blank" rel="noopener noreferrer">{item.bifrost !== "null" ? '*' : 'Bad' }</a></td>
                
              {chains &&
                <>
                  <ChainTD chain={'BNB'} obchains={item.obchains} maxChainHeights={maxChainHeights} />
                  <ChainTD chain={'BTC'} obchains={item.obchains} maxChainHeights={maxChainHeights} />
                  <ChainTD chain={'ETH'} obchains={item.obchains} maxChainHeights={maxChainHeights} />
                  <ChainTD chain={'LTC'} obchains={item.obchains} maxChainHeights={maxChainHeights} />
                  <ChainTD chain={'BCH'} obchains={item.obchains} maxChainHeights={maxChainHeights} />
                  <ChainTD chain={'DOGE'} obchains={item.obchains} maxChainHeights={maxChainHeights} />
                  <ChainTD chain={'GAIA'} obchains={item.obchains} maxChainHeights={maxChainHeights} />
                </>
              }
          </tr>
          ))}
          <tr><td></td></tr>
          </tbody>
        </table>
      </div>
    <div className='paging-wrapper'>
      <ul className='page-numbers'>
        <li onClick={handlePrev} className={`nav-button nav-button--prev ${currentPage === 1 ? "disabled" : null}`}><LeftOutlined /></li>
        {renderPageNumbers}
        <li onClick={handleNext} className={`nav-button nav-button--next ${currentPage === totalPages ? "disabled" : null}`}><RightOutlined /></li>
      </ul>
    </div>
    </div>
    </>
  )
}

let timer = null;

const defaulColumns = {
    nodes: true,
    age: true,
    action: true,
    isp: true,
    bond: true,
    providers: true,
    rewards: true,
    apy: true,
    slashes: true,
    score: true,
    version: true,
    rpc: true,
    bfr: true,
  }
export default class extends Component {
  constructor(props) {
    super(props);
     this.state = {
       data: [],
       globalData: [],
       sortBy: 'bond',
       sortDirection: 'desc',
       activeNodes: [],
       standByNodes: [],
       whitelistedNodes: [],
       animateBlockCount: false,
       myFavNodes: [],
       searchTerm: '',
       visibleColumns: defaulColumns,
       nodesFilter: {},
       loading: true,
     };
  }

  async componentWillMount() {

    const myFavNodes = getCookie('myFavNodes')

    const tmp = myFavNodes.length>0 ? JSON.parse(myFavNodes) : []

    this.setState({ myFavNodes: tmp })

    this.refreshData()
  }

  async refreshData() {
    const data = await getData()

    if (this.state.loading) {
      this.setState({ loading: false });
    }

    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        console.log('DEV ONLY: Refresh Data Results: ', data)
    }

    this.setState({data: data.data, globalData: data.globalData, maxChainHeights: data.maxChainHeights, animateBlockCount: false}, ()=>this.setData()) //Change animateBlockCount to true here for animation
  }

  componentDidMount() {

    timer = setInterval(() => {
      this.setState({animateBlockCount: false}, ()=>this.refreshData())
      //this.refreshData()
    }, 6000)
  }

  componentWillUnmount() {
    clearInterval(timer);
  }

  addToFav(address) {
    const myFavNodes = getCookie('myFavNodes')//JSON.parse(

    if(myFavNodes.length===0) {
      //in here no current fav nodes
      const singleAddress = JSON.stringify([address])
      setCookie('myFavNodes', singleAddress)
      this.setState({myFavNodes: singleAddress}, ()=>this.setData())

    } else {
      //If we already have some fav nodes
      const newFaveNodes = JSON.parse(myFavNodes)

      //Need to check if already exists
      if (newFaveNodes.indexOf(address) > -1) {
          //In the array!

          const newArrayWithRemove = newFaveNodes.filter(item => item!==address)

          const newFaveNodesNew = JSON.stringify(newArrayWithRemove)
          this.setState({myFavNodes: newArrayWithRemove}, ()=>this.setData())
          setCookie('myFavNodes', newFaveNodesNew)

      } else {
          //Not in the array
          newFaveNodes[newFaveNodes.length] = address

          const newFaveNodesNew = JSON.stringify(newFaveNodes)

          this.setState({myFavNodes: newFaveNodes}, ()=>this.setData())
          setCookie('myFavNodes', newFaveNodesNew)

      }

    }

  }

  returnSearchedData(data) {
      if (this.state.searchTerm === '') {
        return data
      } else {
        const filteredNodes = data.filter(item => item.node_address.includes(this.state.searchTerm))
        return filteredNodes
      }
  }

  setData() {
    //Grab our state so we can mutate it
    let myData = JSON.parse(JSON.stringify(this.state.data))




    //Add faves to the data, then we can sort by then below
    const newItems = myData.map(item => {
        if (this.state.myFavNodes.includes(item.node_address)) {
          item.fave = 1
        } else {
          item.fave = 0
        }
        return item
      });

/*
Whitelisted
Active
Standby
Ready
Disabled
*/

      //Filter for our three tables
      let activeNodes = newItems.filter(item => item.status ==='Active')
      let standbyNodes = newItems.filter(item => (item.status ==='Standby' || item.status ==='Ready') && item.version === this.state.globalData.maxVersion)

      //Create an array of all nodes that are active and standby
      const active_standy_nodes = [ ...activeNodes.map(item => {return item.node_address}), ...standbyNodes.map(item => {return item.node_address})]
      //White listed are all other nodes which are not active or on standby
      //White listed is really just "Other"
      let whitelisted = newItems.filter(item => !active_standy_nodes.includes(item.node_address))

      //let whitelisted = newItems.filter(item => !(item.status ==='Active' || item.status ==='Standby' || item.status ==='Ready') /*&& item.version !== this.state.globalData.maxVersion*/)

      activeNodes = this.findChurnOuts(activeNodes) //Add in the actions for churning
      standbyNodes = this.findChurnIns(standbyNodes) //Add in the actions for nodes churning in

      //Filter here if any searchTerm from the search bar
      //Need to do after adding the actions
      activeNodes = this.returnSearchedData(activeNodes)
      standbyNodes = this.returnSearchedData(standbyNodes)
      whitelisted = this.returnSearchedData(whitelisted)

      //Sort and add our favs to the top
      let activeNodesSorted = this.sortData(activeNodes)
      const favActiveNodesSorted = activeNodesSorted.filter(item => item.fave === 1) //Get our favourites
      activeNodesSorted = activeNodesSorted.filter(item => item.fave === 0)//Get our non favourites

      activeNodesSorted = [...favActiveNodesSorted, ...activeNodesSorted] //Join faves at top with non favourites


      const standBySorted = this.sortData(standbyNodes)
      const whitelistedSorted = this.sortData(whitelisted)

      this.setState({
        activeNodes: activeNodesSorted,
        standByNodes: standBySorted,
        whitelistedNodes: whitelistedSorted //This is really just other
      })
  }


  onColumnUpdate (config) {
    this.setState({ visibleColumns: config })
  }

  onNodesFilter (key) {
    this.setState(prevState => ({
      nodesFilter: {
        ...prevState.nodesFilter,
        [key]: !prevState.nodesFilter[key]
      }
    }));
  }

/*
Split the data into over 300ks and under 300ks
With the over 300ks, take the top 3 if they exist and apply churn in action
If 4 nodes churn in instead of 3 each time, add another row
*/
  findChurnIns(standbyNodes) {
    if (standbyNodes.length === 0) return [] //Stops filter from breaking when search returns 0

    const over300 = standbyNodes.filter(item => item.bond >= 30000000000000)
    const over300Sorted = this.sortData(over300, 'bond', 'desc')

    if (over300Sorted.length > 0){
      over300Sorted[Math.min(0, over300Sorted.length-1)].action = 'Churn In'
      over300Sorted[Math.min(1, over300Sorted.length-1)].action = 'Churn In'
      over300Sorted[Math.min(2, over300Sorted.length-1)].action = 'Churn In'
      over300Sorted[Math.min(3, over300Sorted.length-1)].action = 'Churn In'
      over300Sorted[Math.min(4, over300Sorted.length-1)].action = 'Churn In'
    }
    const under300 = standbyNodes.filter(item => item.bond < 30000000000000)

    return [...over300Sorted, ...under300]
  }

/*
Lowest Bond
Oldest Node
Worst Performer (Can't churn out if just churned in, one cycle grace period)
*/
  findChurnOuts(activeNodes) {
    if (activeNodes.length === 0) return [] //Stops filter from breaking when search returns 0

    let activeNodesSorted = this.sortData(activeNodes, 'age', 'desc')
    activeNodesSorted[0].action = 'Oldest'

    activeNodesSorted = this.sortData(activeNodes, 'bond', 'asc')
    activeNodesSorted[0].action = 'Smallest Bond'

    activeNodesSorted = this.sortData(activeNodes, 'score', 'asc', true)
    //we set the 'Worst Performing' tag in the sortData function

    this.calcBadValidatorRedline(activeNodes)

    return activeNodesSorted
  }

  calcBadValidatorRedline(activeNodes){
    //Only get nodes with slashes greater than 100
    const greater100Slashes = activeNodes.filter(item => item.slash_points > 100)
    //Add all the scores together for thes nodes
    const sum = greater100Slashes.reduce((accumulator, object) => {
      return accumulator + parseFloat(object.score);
    }, 0);
    //Find the average
    const averageScore = sum/(greater100Slashes.length+1)

    const validatorLine = averageScore/this.state.globalData.BadValidatorRedline

    activeNodes.map(item => {
      if(item.score < validatorLine) {
        item.action = 'Bad Redline'
      }
      return 0
    })

  }

/*
Sort by either string or number
We use string sort function if value is one of the arrays else do second sort number
*/
  sortData(data, value = null, direction = null, worst_perform = false) {
    const toSortBy = value === null ? this.state.sortBy : value
    let newData = []

    if (['node', 'isp', 'location', 'version', 'action', 'node_address'].includes(toSortBy)){ //This sort function for strings
      newData = data.sort((a, b) => a[toSortBy].localeCompare(b[toSortBy]));

    } else if (toSortBy === 'bond_providers') {//This is for bond provider sort as we need to go another layer deep in the object
      newData = data.sort((a, b) => a[toSortBy].providers.length - b[toSortBy].providers.length);

    } else if (worst_perform === true) { //This is for when we are sorting for action of worst performance as we want to exclude any with age under 3 days
      const ageCutOffDays = 3
      const a = data.filter(item => parseFloat(item.age) > ageCutOffDays)
      const b = data.filter(item => parseFloat(item.age) <= ageCutOffDays)
      const aSorted = a.sort((a, b) => (b[toSortBy] - a[toSortBy]) );

      aSorted[aSorted.length-1].action = 'Worst Performing'
      newData = [...aSorted, ...b]

    } else { //This sort function for numbers
      //When sorting, if values are the same, sort by node_address
      newData = data.sort(
                 function(a, b) {
                    if (a[toSortBy] === b[toSortBy]) {
                       return a['node_address'].localeCompare(b['node_address']);
                    }
                    return a[toSortBy] > b[toSortBy] ? 1 : -1;
                 });
    }
    //If we pass it a direction, we set it here, if not we take it from the state
    const toDirection = direction === null ? this.state.sortDirection : direction
    if (toDirection === 'desc') {
      newData.reverse()
    }

    return newData
  }

  clickSortHeader(item){
    const direction = this.state.sortBy !== item ? 'desc' : this.state.sortDirection === 'desc' ? 'asc' : 'desc';
    this.setState({sortBy: item, sortDirection: direction}, ()=> this.setData())
  }

  sortColour(item) {
    return '#ffffff'
  }

  whichHeart(address){
    return this.state.myFavNodes.includes(address) ? heartFull : heartBlank
  }


  searchBar() {
    return (
      <div className='search-input'>
      <Input
        style={{ width: 500, height: 46, borderRadius: 6, background: '#fff'}}
        onChange={(event) => this.setState({ searchTerm: event.target.value.trim().toLowerCase()},()=>this.setData())}
        prefix={<SearchOutlined/>}
      />
      </div>
    )
  }

  render() {

    const { loading, nodesFilter, visibleColumns, standByNodes } = this.state;

    return (
      <Layout>
      <Header style={{color:'white', fontSize:25, fontWeight: 700, minWidth: 1580, height: 110, display: 'flex', alignItems: 'center'}}>
        <div className='header-left'>
          <img alt="#" src={thornode} style={{width: 55, height: 55, margin: 'auto 22px auto 0'}}/>
          <span>Thornode Monitor</span>
        </div>
        <div className='header-right'>
          <div className={`active-node ${nodesFilter.active ? "active-node--active" : null}`} onClick={()=>this.onNodesFilter('active')}><img src={activeIcon}/></div>
          <div className={`active-node ${nodesFilter.standby ? "active-node--active" : null}`} onClick={()=>this.onNodesFilter('standby')}><img src={powerIcon}/></div>
          <div className={`active-node ${nodesFilter.orthers ? "active-node--active" : null}`} onClick={()=>this.onNodesFilter('orthers')}><img src={threeDotsIcon}/></div>
        </div>
        
      </Header>
       <Content style={{padding:40, backgroundColor: 'white'}}>

          {loading && (
            <div className='loading'><img src={loadingIcon} className='loading_icon'/></div>
          )}

          {!(loading) && (
            <div className='layout-content-wrapper'>

              <Breadcrumb separator={<RightOutlined />}>
                <Breadcrumb.Item href="/">Dashboard</Breadcrumb.Item>
                <Breadcrumb.Item className='current'>Standby Nodes</Breadcrumb.Item>
              </Breadcrumb>

              <div className='overview-list-wrapper'>
                <div className='overview-list'>
                  <GlobalData state={this.state} globalData={this.state.globalData} animateBlockCount={this.state.animateBlockCount}/>
                  <CoinGeckoData globalData={this.state.globalData} />
                </div>
              </div>
      
                <>
                  <div className='cta-wrapper'>
                    <div className='cta-link'>
                        <Button type="primary" className='uppercase'>
                          Standby Nodes
                        </Button>
                    </div>
                    {this.searchBar()}

                    <VisibleColumn initialConfig={visibleColumns} onConfigUpdate={this.onColumnUpdate.bind(this)}/>
                  </div>

                  {standByNodes.length > 0 && (
                    <NodeTable visibleColumns={visibleColumns} whichHeart={this.whichHeart.bind(this)} addToFav={this.addToFav.bind(this)} nodeData={standByNodes} clickSortHeader={this.clickSortHeader.bind(this)} sortColour={this.sortColour.bind(this)} maxChainHeights={this.state.maxChainHeights} chains={false} sortBy={this.state.sortBy} sortDirection={this.state.sortDirection}/>
                  )}
                  {standByNodes.length === 0 && (
                    <div className='no-data'>
                    <div className='no-data__content'>No Standby Data Available!</div>
                  </div>
                  )}
                </>
            </div>
          )}
        </Content>
       <Footer>
        <a href='https://github.com/liquify-validation' target="_blank" className='link'><img alt="#" src={githubIcon} className='overview-item__icon'/></a>
        <a href='https://twitter.com/Liquify_ltd' target="_blank" className='link'><img alt="#" src={twitterIcon} className='overview-item__icon'/></a>
        <div className='logo-wrapper'>
          <span>Built by:</span>
          <img alt="#" src={liquifyLogo} className='overview-item__icon'/>
        </div>
       </Footer>
     </Layout>
    );
  }
}
