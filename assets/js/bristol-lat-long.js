// Coordinates for outline of Bristol from GADM database: https://gadm.org/download_country_v3.html

const bristolMap = [
{ lng: -2.58329916, lat: 51.39482117 },
{ lng: -2.6181612, lat: 51.403759 },
{ lng: -2.61845398, lat: 51.425457 },
{ lng: -2.62012076, lat: 51.44172668 },
{ lng: -2.61590171, lat: 51.45079041 },
{ lng: -2.61893058, lat: 51.46072388 },
{ lng: -2.63058496, lat: 51.46608734 },
{ lng: -2.6438427, lat: 51.48229218 },
{ lng: -2.65255737, lat: 51.48405075 },
{ lng: -2.67719007, lat: 51.4848175 },
{ lng: -2.69325757, lat: 51.49376297 },
{ lng: -2.71463323, lat: 51.50902939 },
{ lng: -2.71416807, lat: 51.50902939 },
{ lng: -2.71416807, lat: 51.50986099 },
{ lng: -2.71361208, lat: 51.50986099 },
{ lng: -2.71361208, lat: 51.51013947 },
{ lng: -2.7130549, lat: 51.51013947 },
{ lng: -2.7130549, lat: 51.51041794 },
{ lng: -2.7124989, lat: 51.51041794 },
{ lng: -2.7124989, lat: 51.5106926 },
{ lng: -2.71194506, lat: 51.5106926 },
{ lng: -2.71194506, lat: 51.51097107 },
{ lng: -2.71138906, lat: 51.51097107 },
{ lng: -2.71138906, lat: 51.51152802 },
{ lng: -2.71083307, lat: 51.51152802 },
{ lng: -2.71083307, lat: 51.51235962 },
{ lng: -2.71027708, lat: 51.51235962 },
{ lng: -2.71027708, lat: 51.51291656 },
{ lng: -2.709723, lat: 51.51291656 },
{ lng: -2.709723, lat: 51.51430511 },
{ lng: -2.709167, lat: 51.51430511 },
{ lng: -2.709167, lat: 51.51458359 },
{ lng: -2.70861101, lat: 51.51458359 },
{ lng: -2.70861101, lat: 51.51514053 },
{ lng: -2.70805502, lat: 51.51514053 },
{ lng: -2.70805502, lat: 51.51541519 },
{ lng: -2.70749903, lat: 51.51541519 },
{ lng: -2.70749903, lat: 51.51569366 },
{ lng: -2.70694494, lat: 51.51569366 },
{ lng: -2.70694494, lat: 51.51597214 },
{ lng: -2.70638895, lat: 51.51597214 },
{ lng: -2.70638895, lat: 51.51625061 },
{ lng: -2.70583296, lat: 51.51625061 },
{ lng: -2.70583296, lat: 51.51680374 },
{ lng: -2.70527697, lat: 51.51680374 },
{ lng: -2.70527697, lat: 51.51708221 },
{ lng: -2.70472288, lat: 51.51708221 },
{ lng: -2.70472288, lat: 51.51736069 },
{ lng: -2.70416689, lat: 51.51736069 },
{ lng: -2.70416689, lat: 51.51763916 },
{ lng: -2.7036109, lat: 51.51763916 },
{ lng: -2.7036109, lat: 51.51819611 },
{ lng: -2.7030549, lat: 51.51819611 },
{ lng: -2.7030549, lat: 51.51847076 },
{ lng: -2.70250106, lat: 51.51847076 },
{ lng: -2.70250106, lat: 51.51874924 },
{ lng: -2.70138788, lat: 51.51874924 },
{ lng: -2.70138788, lat: 51.51930618 },
{ lng: -2.70083189, lat: 51.51930618 },
{ lng: -2.70083189, lat: 51.51985931 },
{ lng: -2.700279, lat: 51.51985931 },
{ lng: -2.700279, lat: 51.52041626 },
{ lng: -2.69972205, lat: 51.52041626 },
{ lng: -2.69972205, lat: 51.52069473 },
{ lng: -2.69916606, lat: 51.52069473 },
{ lng: -2.69916606, lat: 51.52125168 },
{ lng: -2.69861007, lat: 51.52125168 },
{ lng: -2.69861007, lat: 51.52152634 },
{ lng: -2.69916606, lat: 51.52152634 },
{ lng: -2.69916606, lat: 51.52208328 },
{ lng: -2.69861007, lat: 51.52208328 },
{ lng: -2.69861007, lat: 51.52236176 },
{ lng: -2.69805598, lat: 51.52236176 },
{ lng: -2.69805598, lat: 51.52291489 },
{ lng: -2.696944, lat: 51.52291489 },
{ lng: -2.696944, lat: 51.52319336 },
{ lng: -2.69638801, lat: 51.52319336 },
{ lng: -2.69638801, lat: 51.52347183 },
{ lng: -2.69527793, lat: 51.52347183 },
{ lng: -2.69527793, lat: 51.52375031 },
{ lng: -2.69472194, lat: 51.52375031 },
{ lng: -2.69472194, lat: 51.52430725 },
{ lng: -2.6936121, lat: 51.52430725 },
{ lng: -2.6936121, lat: 51.52458191 },
{ lng: -2.69305611, lat: 51.52458191 },
{ lng: -2.69305611, lat: 51.5256958 },
{ lng: -2.69250011, lat: 51.5256958 },
{ lng: -2.69250011, lat: 51.52597046 },
{ lng: -2.69194388, lat: 51.52597046 },
{ lng: -2.69194388, lat: 51.52680588 },
{ lng: -2.69139004, lat: 51.52680588 },
{ lng: -2.69139004, lat: 51.52708435 },
{ lng: -2.69083405, lat: 51.52708435 },
{ lng: -2.69083405, lat: 51.52763748 },
{ lng: -2.69027805, lat: 51.52763748 },
{ lng: -2.69027805, lat: 51.52791595 },
{ lng: -2.68972206, lat: 51.52791595 },
{ lng: -2.68972206, lat: 51.5284729 },
{ lng: -2.68916798, lat: 51.5284729 },
{ lng: -2.68916512, lat: 51.52902603 },
{ lng: -2.68861198, lat: 51.52902603 },
{ lng: -2.68861198, lat: 51.52986145 },
{ lng: -2.68805599, lat: 51.52986145 },
{ lng: -2.68805599, lat: 51.5304184 },
{ lng: -2.68749905, lat: 51.5304184 },
{ lng: -2.68749905, lat: 51.53069305 },
{ lng: -2.68694305, lat: 51.53069305 },
{ lng: -2.68694305, lat: 51.53236008 },
{ lng: -2.68638992, lat: 51.53236008 },
{ lng: -2.68638992, lat: 51.53291702 },
{ lng: -2.68527699, lat: 51.53291702 },
{ lng: -2.68527699, lat: 51.5331955 },
{ lng: -2.68472099, lat: 51.5331955 },
{ lng: -2.68472099, lat: 51.53374863 },
{ lng: -2.68416691, lat: 51.53374863 },
{ lng: -2.68416691, lat: 51.53458405 },
{ lng: -2.68361092, lat: 51.53458405 },
{ lng: -2.68361092, lat: 51.53513718 },
{ lng: -2.68305492, lat: 51.53513718 },
{ lng: -2.68305492, lat: 51.53552628 },
{ lng: -2.68305492, lat: 51.53569412 },
{ lng: -2.68249893, lat: 51.53569412 },
{ lng: -2.68249893, lat: 51.5359726 },
{ lng: -2.68194509, lat: 51.5359726 },
{ lng: -2.68194509, lat: 51.53652954 },
{ lng: -2.68138909, lat: 51.53652954 },
{ lng: -2.68138909, lat: 51.5368042 },
{ lng: -2.6808331, lat: 51.5368042 },
{ lng: -2.6808331, lat: 51.53736115 },
{ lng: -2.68027711, lat: 51.53736115 },
{ lng: -2.68027711, lat: 51.53819275 },
{ lng: -2.67972302, lat: 51.53819275 },
{ lng: -2.67972302, lat: 51.53930664 },
{ lng: -2.67916703, lat: 51.53930664 },
{ lng: -2.67916703, lat: 51.53985977 },
{ lng: -2.67861104, lat: 51.53985977 },
{ lng: -2.67861104, lat: 51.54041672 },
{ lng: -2.67805505, lat: 51.54041672 },
{ lng: -2.67805505, lat: 51.54097366 },
{ lng: -2.67750096, lat: 51.54097366 },
{ lng: -2.67750096, lat: 51.54208374 },
{ lng: -2.67694497, lat: 51.54208374 },
{ lng: -2.67694497, lat: 51.54291534 },
{ lng: -2.67638898, lat: 51.54291534 },
{ lng: -2.67638898, lat: 51.54319382 },
{ lng: -2.67583299, lat: 51.54319382 },
{ lng: -2.67583299, lat: 51.54375076 },
{ lng: -2.6752789, lat: 51.54375076 },
{ lng: -2.6752789, lat: 51.54402924 },
{ lng: -2.67472291, lat: 51.54402924 },
{ lng: -2.67472291, lat: 51.54486084 },
{ lng: -2.67416596, lat: 51.54486084 },
{ lng: -2.67416596, lat: 51.54569626 },
{ lng: -2.67360997, lat: 51.54569626 },
{ lng: -2.67360997, lat: 51.54597092 },
{ lng: -2.67305708, lat: 51.54597092 },
{ lng: -2.67305398, lat: 51.54708481 },
{ lng: -2.6724999, lat: 51.54708481 },
{ lng: -2.6724999, lat: 51.54735947 },
{ lng: -2.6719439, lat: 51.54735947 },
{ lng: -2.6719439, lat: 51.54847336 },
{ lng: -2.67138791, lat: 51.54847336 },
{ lng: -2.67138791, lat: 51.54902649 },
{ lng: -2.67083406, lat: 51.54902649 },
{ lng: -2.67083406, lat: 51.54986191 },
{ lng: -2.67027807, lat: 51.54986191 },
{ lng: -2.67027807, lat: 51.55014038 },
{ lng: -2.66972208, lat: 51.55014038 },
{ lng: -2.66972208, lat: 51.55236053 },
{ lng: -2.65772176, lat: 51.54098892 },
{ lng: -2.64732814, lat: 51.52386856 },
{ lng: -2.6414032, lat: 51.51485825 },
{ lng: -2.60949707, lat: 51.51321793 },
{ lng: -2.57184196, lat: 51.51521683 },
{ lng: -2.5717063, lat: 51.50436783 },
{ lng: -2.54555106, lat: 51.49816132 },
{ lng: -2.51216054, lat: 51.49198151 },
{ lng: -2.50473833, lat: 51.47573853 },
{ lng: -2.51172519, lat: 51.45310211 },
{ lng: -2.51810002, lat: 51.44703293 },
{ lng: -2.51810002, lat: 51.4430542 },
{ lng: -2.51904655, lat: 51.43595886 },
{ lng: -2.52077794, lat: 51.42297745 },
{ lng: -2.5226469, lat: 51.41886902 },
{ lng: -2.52535844, lat: 51.41290283 },
{ lng: -2.52747011, lat: 51.40825653 },
{ lng: -2.52911472, lat: 51.40624619 },
{ lng: -2.5357995, lat: 51.40777969 },
{ lng: -2.54882264, lat: 51.40862274 },
{ lng: -2.56754017, lat: 51.40220642 },
{ lng: -2.58329916, lat: 51.39482117 },
];