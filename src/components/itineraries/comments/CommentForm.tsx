import React from "react";
import SubmitButton from "../../global/SubmitButton";
import { connect } from "react-redux";
import { TextField, makeStyles, FormControl, FormHelperText } from "@material-ui/core";
//STYLES:
const useStyles = makeStyles({
	root: {
		display: "flex",
		justifyContent: "space-between",
		padding: "0.1em 0.5em",
	},
	text: {
		flex: 1,
	},
});

//TS:
interface Values {
	text: string;
}

function CommentForm(props: any) {
	const classes = useStyles();
   //State & props
   const { itinId, token, userName, updateCommentArray } = props;
	const [values, setValues] = React.useState<Values>({
		text: "",
	});
	const [errors, setErrors] = React.useState<Values>({
		text: "",
   });
   const [success, setSuccess] = React.useState<boolean | null>(null)
   const [pending, setPending] = React.useState(false)
	//Func
	const handleChange = (prop: keyof Values) => (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setValues({ ...values, [prop]: event.target.value });
		setErrors({ ...errors, [prop]: "" });
	};
	const handleSubmit = (event: React.SyntheticEvent) => {
		event.preventDefault();
		if (values.text.length) {
         setPending(true);
         postComment()
            .then(res => {
               if (res.success) {
                  console.log(res.msg);
                  setSuccess(true);
                  setValues({...values, text: ""});
                  
                  updateCommentArray("add", res.comment);
               } else {
                  setErrors({...errors, text: res.msg});
                  setSuccess(false);
               }
               setPending(false);
            })
		} else {
			setErrors({ ...values, text: "Cannot be blank" });
		}
   };
   async function postComment() {
      let response = await fetch("http://localhost:5000/commentsAPI/post", {
			   method: "post",
			   headers: {
               Accept: "application/json, text/plain, */*",
               "Content-Type": "application/json",
               "x-api-key": token,
            },
            body: JSON.stringify({
               itin: itinId,
               author: userName,
               text: values.text,
            })
         });
      return await response.json();
   }
	//Render
	return (
		<form className={classes.root} onSubmit={handleSubmit}>
			<FormControl className={classes.text}>
				<TextField
               onChange={handleChange("text")}
               value={values.text}
					placeholder="Your comment..."
					multiline
					rows={1}
					rowsMax={4}
					error={errors.text.length ? true : false}
				/>
				<FormHelperText id="text-helper-text">
					{errors.text.length ? errors.text : null}
				</FormHelperText>
			</FormControl>
			{/* <input type="text" onChange={handleChange("text")} placeholder="Your comment..." /> */}
			<SubmitButton loading={pending} success={success} />
		</form>
	);
}

const mapStateToProps = (state: any) => {
   return {
      token: state.login.token,
      userName: state.currentUser.details.name
   }
}

export default connect(mapStateToProps)(CommentForm);
