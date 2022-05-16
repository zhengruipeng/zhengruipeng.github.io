<?php
        $number = 12;
        $arr = array_fill(0,1e6,0);
        function f($n,$arr){
            $sum = 1;
            if($arr[$n]) return $arr[$n];
            for($i = 2; $i <= sqrt($n); $i++){
                if($n % $i === 0) {
                    if($i * $i === $n)
                        $sum += f($i,$arr);
                    else
                        $sum += f($i,$arr) + f($n / $i,$arr);
                }
            }
            return $sum;
        }

        echo f($number,$arr);