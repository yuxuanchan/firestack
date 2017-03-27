/**
 * Iconfont set component.
 * Usage: <Iconfont name="icon-name" size={20} color="#4F8EF7" />
 *
 * @providesModule Iconfont
 */
import { createIconSet } from 'react-native-vector-icons';


const glyphMap = {
	fin: 59648,
	game: 59649,
	idd: 59650,
	internet: 59651,
	postpaid: 59652,
	prepaid: 59653,
	services: 59654,
	summons: 59655,
	tv: 59656,
	utilities: 59657,
};

const fontIcon = createIconSet(glyphMap, 'icomoon', 'fontIcon.ttf');

module.exports = fontIcon;
module.exports.glyphMap = glyphMap;
