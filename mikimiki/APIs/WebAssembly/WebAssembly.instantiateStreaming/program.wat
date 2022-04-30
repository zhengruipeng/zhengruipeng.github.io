(module
 (type $FUNCSIG$vii (func (param i32 i32)))
 (import "env" "print" (func $print (param i32 i32)))
 (table 0 anyfunc)
 (memory $0 1)
 (export "memory" (memory $0))
 (export "getArrayOffset" (func $getArrayOffset))
 (export "swap" (func $swap))
 (export "quicksort_core" (func $quicksort_core))
 (export "sort" (func $sort))
 (func $getArrayOffset (; 1 ;) (result i32)
  (i32.const 16)
 )
 (func $swap (; 2 ;) (param $0 i32) (param $1 i32)
  (local $2 i32)
  (set_local $2
   (i32.load
    (get_local $0)
   )
  )
  (i32.store
   (get_local $0)
   (i32.load
    (get_local $1)
   )
  )
  (i32.store
   (get_local $1)
   (get_local $2)
  )
 )
 (func $quicksort_core (; 3 ;) (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (block $label$0
   (br_if $label$0
    (i32.ge_s
     (get_local $2)
     (get_local $3)
    )
   )
   (loop $label$1
    (set_local $8
     (i32.lt_s
      (tee_local $7
       (i32.load
        (i32.add
         (get_local $0)
         (i32.shl
          (tee_local $9
           (i32.add
            (tee_local $4
             (get_local $2)
            )
            (i32.const 1)
           )
          )
          (i32.const 2)
         )
        )
       )
      )
      (tee_local $6
       (i32.load
        (tee_local $5
         (i32.add
          (get_local $0)
          (i32.shl
           (get_local $4)
           (i32.const 2)
          )
         )
        )
       )
      )
     )
    )
    (block $label$2
     (block $label$3
      (block $label$4
       (br_if $label$4
        (i32.ge_s
         (get_local $9)
         (get_local $3)
        )
       )
       (set_local $2
        (get_local $3)
       )
       (loop $label$5
        (set_local $7
         (i32.lt_s
          (get_local $7)
          (get_local $6)
         )
        )
        (block $label$6
         (loop $label$7
          (br_if $label$6
           (i32.eqz
            (i32.and
             (get_local $8)
             (i32.const 1)
            )
           )
          )
          (set_local $8
           (get_local $7)
          )
          (br_if $label$7
           (i32.lt_s
            (get_local $9)
            (tee_local $2
             (i32.add
              (get_local $2)
              (i32.const -1)
             )
            )
           )
          )
          (br $label$3)
         )
        )
        (set_local $8
         (i32.lt_s
          (tee_local $7
           (i32.load
            (i32.add
             (get_local $0)
             (i32.shl
              (tee_local $9
               (i32.add
                (get_local $9)
                (i32.const 1)
               )
              )
              (i32.const 2)
             )
            )
           )
          )
          (get_local $6)
         )
        )
        (br_if $label$5
         (i32.lt_s
          (get_local $9)
          (get_local $2)
         )
        )
        (br $label$2)
       )
      )
      (set_local $2
       (get_local $3)
      )
      (br $label$2)
     )
     (set_local $8
      (get_local $7)
     )
    )
    (i32.store
     (get_local $5)
     (i32.load
      (tee_local $9
       (i32.add
        (get_local $0)
        (i32.shl
         (tee_local $8
          (i32.sub
           (get_local $9)
           (i32.xor
            (get_local $8)
            (i32.const 1)
           )
          )
         )
         (i32.const 2)
        )
       )
      )
     )
    )
    (i32.store
     (get_local $9)
     (get_local $6)
    )
    (call $quicksort_core
     (get_local $0)
     (get_local $1)
     (get_local $4)
     (get_local $8)
    )
    (br_if $label$1
     (i32.lt_s
      (get_local $2)
      (get_local $3)
     )
    )
   )
  )
 )
 (func $sort (; 4 ;)
  (call $quicksort_core
   (i32.const 16)
   (i32.const 10)
   (i32.const 0)
   (i32.const 9)
  )
  (call $print
   (i32.const 16)
   (i32.const 10)
  )
 )
)
