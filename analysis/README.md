
## 이메일확인
```js
const isValidEmail = email => {
  const regex = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );

  return regex.test(email);
};
```
email-check라는 npm ? 

## 로그인 부분
```js
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const error = checkEmailPw(email, password);

  if (error) {
    return res.status(400).send(error);
  }

  const user = await User.findOne({
    where: { email }
  });

  if (user) {
    const isValidPassword = user.validPassword(password);
    if (isValidPassword) {
      const token = jwt.encode({ id: user.id, email: user.email }, config.auth.key);
      res.json({ data: { token, user }, msg: '로그인 성공!' });
    } else {
      return res.status(400).json({ msg: '비밀번호가 잘 못 되었습니다.' });
    }
  } else {
    return res.status(404).json({ msg: '해당하는 사용자가 없습니다.' });
  }
});
```

## 라우팅
```js
router.get('/:id', upload.single('image'), async (req, res) => {
  const id = req.params.id;

  try {
    const product = await Product.findByPk(Number(id));
    return res.json({ data: product });
  } catch (e) {
    return res.status(500).json({ msg: e.message });
  }
});
```

