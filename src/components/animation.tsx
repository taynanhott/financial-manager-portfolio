import { useEffect } from 'react';
import { useMotionValue, useTransform, animate } from 'framer-motion';

const useAnimatedCount = (targetValue: number = 0, duration: number = 1.5) => {
    const count = useMotionValue(0);

    const rounded = useTransform(count, latest => Number(latest).toFixed(2));

    useEffect(() => {
        const controls = animate(count, targetValue, { duration, ease: "easeInOut" });
        return () => controls.stop();
    }, [targetValue, duration, count]);

    return rounded;
};

export default useAnimatedCount;