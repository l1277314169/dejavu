// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Alert, Icon } from 'antd';

import { getIsConnected, getAppname, getUrl } from '../../reducers/app';
import {
	getUrlParams,
	getLocalStorageItem,
	setLocalStorageData,
} from '../../utils';

const LOCAL_STORAGE_ITEM = 'showOldBanner';

type Props = {
	isConnected: boolean,
	rawUrl: string,
	appname: string,
};

const OldDejavuBanner = ({ appname, rawUrl, isConnected }: Props) => {
	const { oldBanner } = getUrlParams(window.location.search);
	const showOldBanner = getLocalStorageItem(LOCAL_STORAGE_ITEM);
	let isVisible = true;

	if (oldBanner && oldBanner === 'false') {
		isVisible = false;
	}

	if (showOldBanner && showOldBanner === 'false') {
		isVisible = false;
	}

	return (
		isConnected &&
		isVisible && (
			<Alert
				type="info"
				closable
				message={
					<div>
						Open app in old dejavu UI
						<a
							href={`https://opensource.appbase.io/dejavu/live/#?app={"appname":"${appname}","url":"${rawUrl}","selectedType":[]}`}
						>
							<Icon type="link" css={{ marginLeft: 3 }} />
						</a>
					</div>
				}
				onClose={() => {
					setLocalStorageData(LOCAL_STORAGE_ITEM, 'false');
				}}
			/>
		)
	);
};
const mapStateToProps = state => ({
	isConnected: getIsConnected(state),
	appname: getAppname(state),
	rawUrl: getUrl(state),
});

export default connect(mapStateToProps)(OldDejavuBanner);
