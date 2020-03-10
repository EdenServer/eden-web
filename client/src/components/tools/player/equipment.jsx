import React from 'react';
import { Button, Loader } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import apiUtil from '../../../apiUtil'; 
import images from '../../../images';

const emptySlot = (slotid) => (
    <div className="equipslot">
        <img alt={`eq${slotid}`} src={images.equipslot(slotid)} />
    </div>
);

const itemSlot = (equip) => (
    <div title={equip.name} className="equipslot">
        <Link to={`/tools?item=${encodeURIComponent(equip.name)}`}>
            <img alt={`eq${equip.equipslotid}`} src={images.item(equip.itemid)} className="icon" />
        </Link>
    </div>
);

export default ({ name, job, ranks, callback }) => {
    const [error, setError] = React.useState(false);
    const [equip, setEquip] = React.useState(null);

    const fetchEquip = () => {
        setEquip(null);
        apiUtil.get({ url: `api/v1/chars/${name}/equip` }, async (error, res) => {
            try {
                if (!error && res.status === 200) {
                    const data = await res.json();
                    callback(data);
                    setEquip(data);
                    setError(false);
                } else {
                    setError(true);
                }
            } catch (error) {
                setError(true);
            }
        });
    }

    React.useEffect(fetchEquip, [name]);

    if (error) {
        return (
            <Button
                circular
                color="orange"
                compact
                icon='refresh'
                onClick={fetchEquip}
            />
        );
    }

    if (!equip) {
        return <Loader active inline />;
    }

    const { main, sub, ranged, ammo, head, body, hands, legs, feet, neck, waist, ear1, ear2, ring1, ring2, back } = equip;
    return (
        <div className="eden_equip-section">
            <div className="player-equipbox">
                {main.itemid ? itemSlot(main) : emptySlot(1)}
                {sub.itemid ? itemSlot(sub) : emptySlot(2)}
                {ranged.itemid ? itemSlot(ranged) : emptySlot(3)}
                {ammo.itemid ? itemSlot(ammo) : emptySlot(4)}
                {head.itemid ? itemSlot(head) : emptySlot(5)}
                {neck.itemid ? itemSlot(neck) : emptySlot(6)}
                {ear1.itemid ? itemSlot(ear1) : emptySlot(7)}
                {ear2.itemid ? itemSlot(ear2) : emptySlot(8)}
                {body.itemid ? itemSlot(body) : emptySlot(9)}
                {hands.itemid ? itemSlot(hands) : emptySlot(10)}
                {ring1.itemid ? itemSlot(ring1) : emptySlot(11)}
                {ring2.itemid ? itemSlot(ring2) : emptySlot(12)}
                {back.itemid ? itemSlot(back) : emptySlot(13)}
                {waist.itemid ? itemSlot(waist) : emptySlot(14)}
                {legs.itemid ? itemSlot(legs) : emptySlot(15)}
                {feet.itemid ? itemSlot(feet) : emptySlot(16)}
            </div>
            <span className="eden_player-nations">
                <img className="eden_player-nation" alt="" src={images.flags.sandoria} />{ranks.sandoria}
                <img className="eden_player-nation" alt="" src={images.flags.bastok} />{ranks.bastok}
                <img className="eden_player-nation" alt="" src={images.flags.windurst} />{ranks.windurst}
            </span>
            <p className="eden_player-job">{job}</p>
        </div>
    );
};
