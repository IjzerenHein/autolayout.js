import { View, VisualFormat } from '..';
import { deepEqual } from 'assert';

const view = new View<'view1' | 'view2'>({
    constraints: VisualFormat.parse([
        'H:|[view1(==view2)]-10-[view2]|',
        'V:|[view1,view2]|'
    ], { extended: true }),
    width: 100,
    height: 80,
    spacing: 2
});
view.setSize(200, 300);
const { top: top1, left: left1, width: width1, height: height1 } = view.subViews.view1;
deepEqual({ top: top1, left: left1, width: width1, height: height1 }, { top: 0, left: 0, width: 95, height: 300 });
